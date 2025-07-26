export const findAllUser = async () =>
  prisma.user.findMany({
    select: {
      id: true,
      permissions: true,
      nickname: true,
    },
  });

export const findUserByUsername = (username: string) =>
  prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      permissions: true,
      passwordHash: true,
    },
  });
