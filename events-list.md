# List of application events

This is a list of all the events used in the chat application so far,
and their meanings.

## Received by client
- **'chat message'**: Emitted when receiving a chat message.
- **'update'**: Emitted when there is info about other user activity. So far this only notifies connects and disconnects.

## Received by server
- **'update user info'**: Always accompanied by a JSON string representing the modifications the client wishes to make to their own user instance.
- **'chat message'**: Emitted when the user sends a chat message to the server.
- **'connection'/'disconnection'** Emitted when a user connects or disconnects.
