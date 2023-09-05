# MEM Webpage clone using [Next.js](https://nextjs.org/) - Orginal [Jbzd](https://jbzd.com.pl/).
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

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
