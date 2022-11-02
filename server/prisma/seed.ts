import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){

    const user = await prisma.user.create({
        data: {
            name: 'jhon',
            email: 'testeA@gmail.com',
            avatarUrl: 'https://github.com/diego3g.png',
        }
    })
    
    const pool = await prisma.pool.create({
        data: {
            title: 'examplepool',
            code: 'BOL121',
            ownerId: user.id,
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T18:42:45.691Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T18:42:45.691Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
    
}

main()