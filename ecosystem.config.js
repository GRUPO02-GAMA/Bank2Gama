module.exports = {
  apps: [
    {
      name: 'bank2gama',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './server.js',
      args: ''
    }
  ]
}
