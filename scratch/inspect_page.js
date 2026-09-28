const http = require('http');

http.get('http://127.0.0.1:9222/json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const tabs = JSON.parse(data);
    const page = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 30,
        method: 'Runtime.evaluate',
        params: {
          expression: `(() => {
            const canvas = document.querySelector('canvas');
            const syms = Object.getOwnPropertySymbols(canvas).map(s => s.toString());
            // In R3F, canvas has a property or fiber
            // Let's find Fiber node
            const fiberKey = Object.keys(canvas).find(k => k.startsWith('__reactFiber'));
            let fiber = canvas[fiberKey];
            let current = fiber;
            let foundRoots = [];
            while (current) {
              if (current.stateNode) {
                const sn = current.stateNode;
                const snKeys = Object.keys(sn);
                if (snKeys.some(k => k.includes('r3f') || k.includes('store') || k.includes('scene'))) {
                  foundRoots.push({ type: current.elementType?.name || current.tag, keys: snKeys });
                }
              }
              current = current.return;
            }
            return {
              canvasSymbols: syms,
              foundRoots
            };
          })()`,
          returnByValue: true
        }
      }));
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === 30) {
        console.log('Fiber Inspection:', JSON.stringify(msg.result?.result?.value, null, 2));
        ws.close();
        process.exit(0);
      }
    };
  });
});
