import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();

// const moduleNames = ['users', 'test'];

export async function main() {
  // for (const moduleName of moduleNames) {
  //   console.log(__dirname + `/seeds/${moduleName}.ts`);
  // }
  await seedDatabase();
}

async function seedUser() {

  let users = [
    {
      id: 'user-1',
      email: 'test@gmail.com',
      password: 'test',
      firstName: 'Admin',
      lastName: 'Test'
    },
    {
      id: 'user-2',
      email: 'tes2t@gmail.com',
      password: 'test2',
      firstName: 'Admin2',
      lastName: 'Test2'
    },
    {
      id: 'user-3',
      email: 'admin@gmail.com',
      password: 'admin',
      firstName: 'Thapanee',
      lastName: 'Intachot'
    }
  ]

  for (const user of users) {
    const password = await hash(user.password, 10)
    user.password = password
  }

  await prisma.user.createMany({
    data: users
  })
}

async function seedPost() {
  await prisma.post.createMany({
    data: [
      {
        id: 'post-1',
        title: 'test travel',
        'description': 'Desc',
        userId: 'user-1',
        categoryId: 'cat-1'
      },
      {
        id: 'post-2',
        title: 'test sport',
        'description': 'Desc',
        userId: 'user-2',
        categoryId: 'cat-2'
      },
      {
        id: 'post-3',
        title: 'test null',
        'description': 'Desc',
        userId: 'user-2',

      }
    ]
  })
}

async function seedCategory() {
  await prisma.category.createMany({
    data: [
      {
        id: 'cat-1',
        name: 'travel'
      },
      {
        id: 'cat-2',
        name: 'sport'
      },
      {
        id: 'cat-3',
        name: 'music'
      },
      {
        id: 'cat-4',
        name: 'food'
      },
      {
        id: 'cat-5',
        name: 'fashion'
      },
      {
        id: 'cat-6',
        name: 'adventure'
      }
    ]
  })
}


async function seedComment() {
  await prisma.comment.createMany({
    data: [
      {
        id: 'comment-1',
        postId: 'post-1',
        body: 'comment about travel',
      },
      {
        id: 'comment-2',
        postId: 'post-1',
        body: 'comment about travel #2',
      },
      {
        id: 'comment-3',
        postId: 'post-2',
        body: 'comment about sport',
      },
      {
        id: 'comment-4',
        postId: 'post-3',
        body: 'comment about null category',
      },
      {
        id: 'comment-5',
        postId: 'post-3',
        body: 'comment about null category #2',
      },
      {
        id: 'comment-6',
        postId: 'post-3',
        body: 'comment about null category #3',
      },
    ]
  })
}


async function seedDatabase() {
  await seedCategory()
  await seedUser()
  await seedPost()
  await seedComment()
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });