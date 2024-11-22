from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import unquote_plus

submitted = []
def submission_to_table(form_data: dict[str, str]) -> str:
    """
    TODO: Takes a dictionary of form parameters and returns an HTML table row

    An example form_data dictionary might look like:
    {
     'name': 'Ryan Hill',
     'location': '2-209 Keller Hall; 200 Union Street SE; Minneapolis, MN 55455',
     'contactInformation': 'Favorite TA',
     'email': 'hill1886@umn.edu',
     'website': 'https://canvas.umn.edu/courses/460624',
    }
    """
    rows = ""
    for form_data in submitted:
        name = form_data.get('name', '')
        location = form_data.get('location', '')
        contact_info = form_data.get('contact_info', '')
        email = form_data.get('email', '')
        website = form_data.get('website', '')

        rows += f"""
        <table border="1">
            <tr>
                <td>{name}</td>
                <td>{location}</td>
                <td>{contact_info}</td>
                <td>{email}</td>
                <td><a href="{website}">{website}</a></td>
            </tr>
        </table>
        """
    return rows


# NOTE: Please read the updated function carefully, as it has changed from the
# version in the previous homework. It has important information in comments
# which will help you complete this assignment.
def handle_request(url: str, form_data: dict[str, str]):
    """
    The url parameter is a *PARTIAL* URL of type string that contains the path
    name and query string.

    If you enter the following URL in your browser's address bar:
    `http://localhost:4131/add-contact.html?name=joe#id=someElement` then the `url` parameter will have
    the value "/add-contact.html?name=joe#id=someElement"

    This function should return two strings in a list or tuple. The first is the
    content to return, and the second is the content-type.
    """
    global submitted
    # Get rid of any query string parameters and fragments
    url, *_ = url.split("?", 1)
    url, *_ = url.split("#", 1)

    if url == "/mycontacts.html":
        return open("static/html/mycontacts.html").read(), "text/html"
    if url == "/add-contact.html":
        return open("static/html/add-contact.html").read(), "text/html"
    elif url == "/aboutme.html":
        return open("static/html/aboutme.html").read(), "text/html"
    elif url == "/stocks.html":
        return open("static/html/stocks.html").read(), "text/html"
    elif url == "/testServer.html":
        return open("static/html/testServer.html").read(), "text/html"
    elif url == "/Coffman_N_OuttaSpace.html":
        return open("static/html/Coffman_N_OuttaSpace.html").read(), "text/html"
    elif url == "/Coffman.html":
        return open("static/html/Coffman.html").read(), "text/html"
    elif url == "/OuttaSpace.html":
        return open("static/html/OuttaSpace.html").read(), "text/html"
    elif url == "/private.html":
        return open("static/html/private.html").read(), "text/html"
    elif url == "/img/gophers-mascot.png":
        return open("static/img/gophers-mascot.png", "br").read(), "image/png"
    # NOTE: These files may be different for your server, but we include them to
    # show you examples of how yours may look. You may need to change the paths
    # to match the files you want to serve. Before you do that, make sure you
    # understand what the code is doing, specifically with the MIME types and
    # opening some files in binary mode, i.e. `open(..., "br")`.
    elif url == "/css/style.css":
        return open("static/css/style.css").read(), "text/css"
    elif url == "/css/mycontactsstyle.css":
        return open("static/css/mycontactsstyle.css").read(), "text/css"
    elif url == "/js/script.js":
        return open("static/js/script.js").read(), "text/javascript"
    elif url == "/js/stocks.js":
        return open("static/js/stocks.js").read(), "text/javascript"
    elif url == "/img/Dan1.jpeg":
        return open("static/img/Dan1.jpeg", "br").read(), "image/jpeg"
    elif url == "/img/ryan.png":
        return open("static/img/ryan.png", "br").read(), "image/jpeg"
    elif url == "/img/president-cunningham.jpg":
        return open("static/img/als.jpg", "br").read(), "image/jpeg"
    elif url == "/img/peter.png":
        return open("static/img/president-cunningham.jpg", "br").read(), "image/jpeg"
    elif url == "/img/als.jpg":
        return open("static/img/peter.png", "br").read(), "image/jpeg"
    elif url == "/img/4131img1.avif":
        return open("static/img/4131img1.avif", "br").read(), "image/jpeg"
    elif url == "/img/4131img2.avif":
        return open("static/img/4131img2.avif", "br").read(), "image/jpeg"
    elif url == "/img/4131img3.avif":
        return open("static/img/4131img3.avif", "br").read(), "image/jpeg"
    elif url == "/img/4131img4.avif":
        return open("static/img/4131img4.avif", "br").read(), "image/jpeg"
    elif url == "/img/4131img5.avif":
        return open("static/img/4131img5.avif", "br").read(), "image/jpeg"
    elif url == "/img/gophers-mascot-1.png":
        return open("static/img/gophers-mascot-1.png", "br").read(), "image/jpeg"
    elif url == "/img/coffman.png":
        return open("static/img/coffman.png", "br").read(), "image/jpeg"
    elif url == "/img/coffman.jpg":
        return open("static/img/coffman.jpg", "br").read(), "image/jpeg"
    elif url == "/img/OuttaSpace.mp3":
        return open("static/img/OuttaSpace.mp3", "br").read(), "audio/mpeg"
    # TODO: Add update the HTML below to match your other pages and implement `submission_to_table`
    elif url == "/added-contacts.html":
        if form_data:
            submitted.append(form_data)
        return ("""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Added Submission</title>
                <link rel="stylesheet" href="/css/mycontactsstyle.css">
            </head>
            <body>
            <nav class="nav_bar">
            <button class="button"><a href="mycontacts.html">My Contacts</a></button>
            <button class="button"><a href="aboutme.html">About Me</a></button>
            <button class="button"><a href="add-contact.html">Add Contact</a></button>
            <button class="button"><a href="added-contacts.html">Added Contact</a></button>
            </nav>
            <h1>New Contacts</h1>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Contact Information</th>
                        <th>Email</th>
                        <th>Website</th>
                    </tr>
                    </thead>
                    <tbody>
                            """
                            + submission_to_table(form_data)
                            + """
                    </tbody>
                </table>
            </div>
            </body>
            </html>""", "text/html; charset=utf-8")
    else:
        return open("static/html/404.html").read(), "text/html; charset=utf-8"


# You shouldn't need to change content below this. It would be best if you just left it alone.

def get_body_params(body: str) -> dict[str, str]:
    if not body:
        return {}

    parameters = body.split("&")

    # Split each parameter into a (key, value) pair, and escape both
    def split_parameter(parameter):
        k, v = parameter.split("=", 1)
        k_escaped = unquote_plus(k)
        v_escaped = unquote_plus(v)
        return k_escaped, v_escaped

    body_dict = dict(map(split_parameter, parameters))
    print(f"Parsed parameters as: {body_dict}")
    # Return a dictionary of the parameters
    return body_dict


class RequestHandler(BaseHTTPRequestHandler):
    def __c_read_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)
        body = str(body, encoding="utf-8")
        return body

    def __c_send_response(self, message, response_code, headers):
        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        # Send the first line of response.
        self.protocol_version = "HTTP/1.1"
        self.send_response(response_code)

        # Send headers (plus a few we'll handle for you)
        for key, value in headers.items():
            self.send_header(key, value)
        self.send_header("Content-Length", str(len(message)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()

        # Send the file.
        self.wfile.write(message)

    # noinspection PyPep8Naming
    def do_GET(self):
        # Call the student-edited server code.
        message, content_type = handle_request(self.path, None)

        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        self.__c_send_response(
            message,
            200,
            {
                "Content-Type": content_type,
                "Content-Length": len(message),
                "X-Content-Type-Options": "nosniff",
            },
        )

    # noinspection PyPep8Naming
    def do_POST(self):
        message, content_type = handle_request(self.path, get_body_params(self.__c_read_body()))

        # Convert the return value into a byte string for network transmission
        if type(message) == str:
            message = bytes(message, "utf8")

        self.__c_send_response(
            message,
            200,
            {
                "Content-Type": content_type,
                "Content-Length": len(message),
                "X-Content-Type-Options": "nosniff",
            },
        )


def main():
    port = 4131
    print(f"Starting server http://localhost:{port}/")
    httpd = HTTPServer(("", port),
                       lambda request, client_address, server: RequestHandler(request, client_address, server))
    httpd.serve_forever()


if __name__ == '__main__':
    main()

