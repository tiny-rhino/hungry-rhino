from channels.routing import route, include
from .consumers import ws_add, ws_message, ws_disconnect

dashboard_routing = [
    route("websocket.connect", ws_add),
    route("websocket.receive", ws_message),
    route("websocket.disconnect", ws_disconnect),
]

routing = [
    include(dashboard_routing, path=r"^/dashboard"),
]