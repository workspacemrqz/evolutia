import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Minimize2, Maximize2, X, Mic, MicOff, Bot, User, Play, Pause } from "lucide-react";

export default function ChatWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{
    id: number;
    sender: 'user' | 'bot';
    text: string;
    time: string;
    type?: 'text' | 'audio';
    audioBlob?: Blob;
  }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState<{ [key: number]: number }>({});
  const [audioDuration, setAudioDuration] = useState<{ [key: number]: number }>({});
  const [conversationId] = useState(() => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playAudio = (messageId: number, audioBlob: Blob) => {
    if (playingAudio === messageId) {
      // Pause current audio
      if (audioRefs.current[messageId]) {
        audioRefs.current[messageId].pause();
        setPlayingAudio(null);
      }
      return;
    }

    // Stop any currently playing audio
    if (playingAudio && audioRefs.current[playingAudio]) {
      audioRefs.current[playingAudio].pause();
    }

    // Create audio element if it doesn't exist
    if (!audioRefs.current[messageId]) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audioRefs.current[messageId] = audio;

      audio.addEventListener('loadedmetadata', () => {
        setAudioDuration(prev => ({ ...prev, [messageId]: audio.duration }));
      });

      audio.addEventListener('timeupdate', () => {
        setAudioProgress(prev => ({ ...prev, [messageId]: audio.currentTime }));
      });

      audio.addEventListener('ended', () => {
        setPlayingAudio(null);
        setAudioProgress(prev => ({ ...prev, [messageId]: 0 }));
      });
    }

    audioRefs.current[messageId].play();
    setPlayingAudio(messageId);
  };

  const sendMessage = async (messageText?: string, audioBlob?: Blob) => {
    if (!messageText?.trim() && !audioBlob) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user' as const,
      text: messageText || (audioBlob ? "🎵 Mensagem de áudio" : ""),
      time: getCurrentTime(),
      type: audioBlob ? 'audio' as const : 'text' as const,
      audioBlob: audioBlob
    };

    setMessages(prev => [...prev, userMessage]);
    const textToSend = messageText || "";
    setInputValue("");
    setIsExpanded(true);
    setIsTyping(true);

    try {
      let requestBody: any;
      let headers: any = {};

      if (audioBlob) {
        // Send audio as form data with only conversation ID
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.webm');
        formData.append('conversationId', conversationId);
        requestBody = formData;
      } else {
        // Send text as JSON with only message and conversation ID
        headers['Content-Type'] = 'application/json';
        requestBody = JSON.stringify({
          message: textToSend,
          conversationId: conversationId
        });
      }
      console.log('Enviando para webhook:', 'https://n8n.srv864082.hstgr.cloud/webhook/evolut');
      console.log('Conversation ID:', conversationId);
      console.log('Payload:', audioBlob ? 'Audio + conversationId' : JSON.parse(requestBody));

      const response = await fetch('https://n8n.srv864082.hstgr.cloud/webhook/evolut', {
        method: 'POST',
        headers: headers,
        body: requestBody
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        console.log('Webhook response data:', data);

        // Try different possible response fields
        const responseText = data.output || data.response || data.message || data.text || data.answer || data.reply;

        if (responseText) {
          // Simulate typing delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          const botMessage = {
            id: Date.now() + 1,
            sender: 'bot' as const,
            text: responseText,
            time: getCurrentTime()
          };
          setMessages(prev => [...prev, botMessage]);
        } else {
          console.log('No response text found in webhook data:', Object.keys(data));
        }
      } else {
        console.error('Webhook response status:', response.status, response.statusText);
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('Webhook response body:', errorText);
        throw new Error(`Webhook response error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending message to webhook:', error);

      // Show different error messages based on error type
      let errorText = "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente em alguns instantes.";

      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorText = "Erro de conexão com o servidor. Verifique sua conexão com a internet e tente novamente.";
      } else if (error instanceof Error && error.message.includes('CORS')) {
        errorText = "Erro de configuração do servidor. Nossa equipe foi notificada.";
      }

      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot' as const,
        text: errorText,
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        sendMessage(undefined, audioBlob).catch(console.error);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Erro ao acessar o microfone. Verifique as permissões do navegador.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTextMessage = () => {
    sendMessage(inputValue).catch(console.error);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextMessage();
    }
  };

  // Typing animation component
  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%]">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <Bot size={16} className="sm:w-5 sm:h-5" />
        </div>
        <div className="rounded-lg p-2 sm:p-3 bg-gray-800 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold">Gabriel, da Evolut IA</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Audio player component
  const AudioPlayer = ({ messageId, audioBlob }: { messageId: number; audioBlob: Blob }) => {
    const progress = audioProgress[messageId] || 0;
    const duration = audioDuration[messageId] || 0;
    const isPlaying = playingAudio === messageId;
    const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

    return (
      <div className="bg-gray-700 rounded-lg p-3 w-48 max-w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => playAudio(messageId, audioBlob)}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <Pause size={14} className="text-white" />
            ) : (
              <Play size={14} className="text-white ml-0.5" />
            )}
          </button>
          <div className="flex-1">
            <div className="relative h-1 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-300 mt-1">
              {formatTime(progress)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-2 sm:py-8 bg-[#060606] flex justify-center chat-widget-section px-2 sm:px-0">
      <motion.div 
        className="w-full max-w-4xl mx-2 sm:mx-4 pb-8 sm:pb-20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-black/80 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden"
          animate={{ 
            height: isExpanded ? (window.innerWidth < 640 ? "600px" : "650px") : (window.innerWidth < 640 ? "450px" : "400px"),
            width: "100%"
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className="bg-[#030303] p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="https://i.ibb.co/rf3PXc8r/LOGO-Evolut-IA-com-texto-na-horizontal.png" 
                alt="Evolut IA Logo" 
                className="h-5 sm:h-6 w-auto max-w-[80px] sm:max-w-[100px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button className="text-white/70 hover:text-white transition-colors p-1">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Blue gradient separator line */}
          <div className="h-px bg-gradient-to-r from-blue-500 to-blue-600"></div>

          {/* Chat Content */}
          <div className="h-full flex flex-col">
            {messages.length === 0 ? (
              // Initial state
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <h3 className="text-white text-2xl font-semibold mb-8">
                    Como posso te ajudar?
                  </h3>
                </div>
              </div>
            ) : (
              // Messages view
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user' 
                            ? 'bg-gray-600 text-white' 
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        }`}>
                          {message.sender === 'user' ? <User size={16} className="sm:w-5 sm:h-5" /> : <Bot size={16} className="sm:w-5 sm:h-5" />}
                        </div>
                        <div className={`rounded-lg p-2 sm:p-3 ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                            : 'bg-gray-800 text-white'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold">
                              {message.sender === 'user' ? 'Você' : 'Gabriel, da Evolut IA'}
                            </span>
                            <span className="text-xs opacity-70">{message.time}</span>
                          </div>
                          {message.type === 'audio' && message.audioBlob ? (
                            <AudioPlayer messageId={message.id} audioBlob={message.audioBlob} />
                          ) : (
                            <p className="text-xs sm:text-sm">{message.text}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && <TypingIndicator />}
                </AnimatePresence>
              </div>
            )}

            {/* Input area */}
            <div className="p-3 sm:p-4 border-t border-gray-800 pb-16 sm:pb-20">
              <div className="flex items-center gap-2 sm:gap-3 bg-gray-900 rounded-lg p-2 sm:p-3">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                    isRecording 
                      ? 'bg-red-500 shadow-lg' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {isRecording ? (
                    <div className="relative flex items-center justify-center">
                      <MicOff size={16} className="text-white z-10" />
                      <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute inset-0 bg-red-300 rounded-full animate-pulse opacity-50"></div>
                    </div>
                  ) : (
                    <Mic size={16} className="text-white" />
                  )}
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Envie uma mensagem..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                  disabled={isRecording}
                />
                <button
                  onClick={handleTextMessage}
                  disabled={isRecording}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 ${
                    inputValue.trim() 
                      ? 'bg-blue-500 hover:bg-blue-600 shadow-lg scale-105' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Send size={16} className="text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                ©2025 | Desenvolvido por Evolut IA
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}