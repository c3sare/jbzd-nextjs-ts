# Memes page clone using [Next.js](https://nextjs.org/) - Orginal [Jbzd](https://jbzd.com.pl/).
This is a Fullstack project of a website.

## Used Technologies
- [Next.js](https://nextjs.org/) 13 with APP dir and Server Actions
- [TypeScript](https://typescript.org/)
- [Prisma ORM](https://www.prisma.io/)
- [MongoDB driver](https://www.mongodb.com/docs/drivers/node/current/) (to create views)
- [React-hook-forms](https://react-hook-form.com/)
- [Next-auth](https://next-auth.js.org/)
- [Zod](https://zod.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [Pusher](https://pusher.com/)

## Features
- Creating account with traditional register form or using OAuth
- Modify account settings like name, gender, city, avatar, password
- Every registered account have public profile (can be hidden if have premium)
- Users ranking based on account create time and profile vote count
- Creating post with Image, text, video containers
- Posts can be voted, added to favourites, badged and more..
- Other users can be blocked, followed (blocked users posts are hided)
- Posts are divided on categories and tags
- Posts can be filtered (search page or page filters)
- Real Time Chat between users
- Real Time notifications (messages and user notifications)

## Prerequisites
Node version 18.x.x

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-discord-clone.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
NEXTAUTH_SECRET=

FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

YOUTUBE_API_KEY=

CLOUDINARY_URL=

PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_SECRET=
```

### Setup Prisma

```shell
npx prisma db seed
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `build`         | Creating production build of the app     |
| `dev`           | Starts a development instance of the app |
