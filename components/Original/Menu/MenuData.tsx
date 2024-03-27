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
                        name: 'Utility',
                        content: '/note/bash/post-Utility',
                    },
                    {
                        name: 'Set Automatic Execution Bash Script',
                        content: '/note/bash/post-SetAutomaticExecutionBashScript',
                    },
                    {
                        name: 'Extract Zip Files',
                        content: '/note/bash/post-ExtractZipFiles',
                    },
                    {
                        name: 'Backup Volume',
                        content: '/note/bash/post-BackupVolume',
                    },
                    {
                        name: 'Clean Volume',
                        content: '/note/bash/post-CleanVolume',
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
