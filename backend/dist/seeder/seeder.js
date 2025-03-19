"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const nanoid_1 = require("nanoid");
const channels_data_1 = require("./channels.data");
const videos_data_1 = require("./videos/videos.data");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Начало заполнения базы данных...');
    const users = [];
    const channelSlugToId = {};
    console.log('Создание каналов и пользователей...');
    for (const channel of channels_data_1.CHANNELS) {
        const password = '123456';
        const hashedPassword = await (0, argon2_1.hash)(password);
        const email = `${channel.slug}@test.com`;
        const user = await prisma.user.create({
            data: {
                name: channel.name,
                email: email,
                password: hashedPassword
            }
        });
        const createdChannel = await prisma.channel.create({
            data: {
                slug: channel.slug,
                description: channel.description || '',
                avatarUrl: channel.avatarUrl || '',
                bannerUrl: channel.bannerUrl || '',
                isVerified: channel.isVerified || false,
                user: {
                    connect: { id: user.id }
                }
            }
        });
        users.push(user);
        channelSlugToId[channel.slug] = createdChannel.id;
    }
    console.log('Каналы и пользователи созданы.');
    console.log('Создание видео, комментариев, лайков и тегов...');
    for (const videoData of videos_data_1.VIDEOS) {
        const channelId = channelSlugToId[videoData.channelSlug];
        if (!channelId) {
            console.warn(`Канал с slug '${videoData.channelSlug}' не найден. Видео '${videoData.title}' пропущено.`);
            continue;
        }
        const createdAt = faker_1.faker.date.between({
            from: faker_1.faker.date.recent({
                days: 365
            }),
            to: new Date()
        });
        const video = await prisma.video.create({
            data: {
                publicId: (0, nanoid_1.nanoid)(10),
                title: videoData.title,
                description: videoData.description || '',
                thumbnailUrl: videoData.thumbnailUrl || '',
                videoFileName: videoData.videoFileName || '',
                maxResolution: videoData.maxResolution,
                viewsCount: videoData.viewsCount || 0,
                isPublic: videoData.isPublic || false,
                channelId: channelId,
                createdAt: createdAt,
                tags: {
                    connectOrCreate: videoData.tags?.map(tagName => ({
                        where: { name: tagName },
                        create: { name: tagName }
                    }))
                }
            }
        });
        console.log(`Видео '${video.title}' создано.`);
        const numComments = faker_1.faker.number.int({ min: 1, max: 10 });
        for (let i = 0; i < numComments; i++) {
            const randomUser = await prisma.user.create({
                data: {
                    name: faker_1.faker.person.fullName(),
                    email: faker_1.faker.internet.email(),
                    password: await (0, argon2_1.hash)('123456')
                }
            });
            await prisma.videoComment.create({
                data: {
                    text: faker_1.faker.lorem.sentences(),
                    userId: randomUser.id,
                    videoId: video.id,
                    createdAt: faker_1.faker.date.between({ from: createdAt, to: new Date() })
                }
            });
        }
        const numLikes = faker_1.faker.number.int({ min: 1, max: 10 });
        const likedUserIds = new Set();
        for (let i = 0; i < numLikes; i++) {
            const randomUser = await prisma.user.create({
                data: {
                    name: faker_1.faker.person.fullName(),
                    email: faker_1.faker.internet.email(),
                    password: await (0, argon2_1.hash)('123456')
                }
            });
            if (!likedUserIds.has(randomUser.id)) {
                likedUserIds.add(randomUser.id);
                await prisma.videoLike.create({
                    data: {
                        userId: randomUser.id,
                        videoId: video.id,
                        createdAt: faker_1.faker.date.between({ from: createdAt, to: new Date() })
                    }
                });
            }
        }
    }
    console.log('Видео, комментарии, лайки и теги созданы.');
    console.log('Заполнение базы данных завершено успешно.');
}
main()
    .catch(e => {
    console.error('Ошибка при заполнении базы данных:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seeder.js.map