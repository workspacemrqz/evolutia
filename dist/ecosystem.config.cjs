module.exports = {
  apps: [{
    name: 'evolut-site',
    script: 'start-production.js',
    cwd: '/home/evolutiaoficial.com/public_html',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      DATABASE_URL: 'postgresql://evolut:%40Workspacen8n@31.97.30.149:5432/EvolutIA'
    },
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/pm2/evolut-site-error.log',
    out_file: '/var/log/pm2/evolut-site-out.log',
    log_file: '/var/log/pm2/evolut-site.log',
    time: true
  }]
};