from channels import Group
import json

from order import models


def send_all():
    json_list = models.Order.objects.dashboard()
    Group("dashboard").send({
        "text": json_list
    }),


# modifies state of obj
def ws_message(message):
    txt = message['text']
    dct = json.loads(txt)
    pk, state = dct.get('id'), dct.get('state')

    if pk and state:
        models.Order.objects.update_state(pk, state)

    send_all()


# Connected to websocket.connect
def ws_add(message):
    message.reply_channel.send({"accept": True})
    Group("dashboard").add(message.reply_channel)
    send_all()


# Connected to websocket.disconnect
def ws_disconnect(message):
    Group("dashboard").discard(message.reply_channel)