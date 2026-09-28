const fs = require('fs');
const http = require('http');

http.get('http://127.0.0.1:9222/json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const tabs = JSON.parse(data);
    const page = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 50,
          method: 'Page.captureScreenshot',
          params: { format: 'png' }
        }));
      }, 4000);
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('BROWSER CONSOLE:', msg.params.type, msg.params.args.map(a => a.value || a.description));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('BROWSER EXCEPTION:', JSON.stringify(msg.params.exceptionDetails));
      }
      if (msg.id === 50) {
        fs.writeFileSync('public/test_render_post.png', Buffer.from(msg.result.data, 'base64'));
        console.log('Saved post-load screenshot!');
        ws.close();
        process.exit(0);
      }
    };
  });
});
