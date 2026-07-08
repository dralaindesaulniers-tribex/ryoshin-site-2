import http.server, os, sys

os.chdir('/Users/alaindesaulniers/Documents/ryoshin-website')
port = int(os.environ.get('PORT', 3456))
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(('', port), handler)
print(f'Serving on port {port}', flush=True)
httpd.serve_forever()
