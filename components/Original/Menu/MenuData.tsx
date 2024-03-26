// deno-lint-ignore no-explicit-any
export const menuData: any = [
    {
        name: 'Home',
        content: '/',
    },
    {
        name: 'Note',
        isOpen: true,
        content: [
            {
                name: 'Bash',
                isOpen: false,
                content: [
                    {
                        name: 'Set Automatic Execution Bash Script',
                        content: '/note/bash/post-SetAutomaticExecutionBashScript',
                    },
                    {
                        name: 'Utility',
                        content: '/note/bash/post-Utility',
                    },
                    {
                        name: 'Play Minecraft Using GPU',
                        content: '/note/bash/post-PlayMinecraftUsingGPU',
                    },
                ],
            },
        ],
    },
    {
        name: 'Profile',
        content: '/profile',
    },
    {
        name: 'Terms of Use',
        content: '/terms',
    },
];
