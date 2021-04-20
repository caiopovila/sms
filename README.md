# SMSApi

1ª Body of messages limited to 1600 characters.

# Routes
GET '/' => index;
POST '/' => send message with params in body: text, to, from;
POST '/test' => send test message for number +5511963614557;