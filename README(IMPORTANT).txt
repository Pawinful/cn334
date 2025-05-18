docker execute command => docker-compose up --build

If you want to execute docker container you have to change the followings:
1. Front/onsupply_front/package.json
    => "scripts": {
            ...
            "start": "next start -p $PORT", ##into => "start": "next start"
            ...
        },

This current settings is to make render.com can host Next.js. So, you have to change package.json before running docker container

Thank you for your attention