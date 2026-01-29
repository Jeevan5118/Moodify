export interface PlaylistSong {
  title: string;
  artist: string;
  duration: string;
  youtubeUrl?: string;
}

export interface PlaylistData {
  [mood: string]: PlaylistSong[];
}

export const PLAYLISTS_BY_MOOD: PlaylistData = {
  happy: [
    {
      title: "Happy",
      artist: "Pharrell Williams",
      duration: "3:53",
      youtubeUrl: "https://www.youtube.com/watch?v=y6Sxv-sUYtM"
    },
    {
      title: "Good Time",
      artist: "Owl City & Carly Rae Jepsen",
      duration: "3:27",
      youtubeUrl: "https://www.youtube.com/watch?v=2X_2IdybTV0"
    },
    {
      title: "Walking on Sunshine",
      artist: "Katrina & The Waves",
      duration: "3:58",
      youtubeUrl: "https://www.youtube.com/watch?v=iPUmE-tne5U"
    },
    {
      title: "I Gotta Feeling",
      artist: "The Black Eyed Peas",
      duration: "4:49",
      youtubeUrl: "https://www.youtube.com/watch?v=uSD4vsh1zBA"
    },
    {
      title: "Shake It Off",
      artist: "Taylor Swift",
      duration: "3:39",
      youtubeUrl: "https://www.youtube.com/watch?v=nfWlot6h_JM"
    },
    {
      title: "Can't Stop the Feeling!",
      artist: "Justin Timberlake",
      duration: "3:56",
      youtubeUrl: "https://www.youtube.com/watch?v=ru0K8uYEZWw"
    }
  ],

  sad: [
    {
      title: "Someone Like You",
      artist: "Adele",
      duration: "4:45",
      youtubeUrl: "https://www.youtube.com/watch?v=hLQl3WQQoQ0"
    },
    {
      title: "All of Me",
      artist: "John Legend",
      duration: "4:29",
      youtubeUrl: "https://www.youtube.com/watch?v=450p7goxZqg"
    },
    {
      title: "Say Something",
      artist: "A Great Big World & Christina Aguilera",
      duration: "3:49",
      youtubeUrl: "https://www.youtube.com/watch?v=-2U0Ivkn2Ds"
    },
    {
      title: "Fix You",
      artist: "Coldplay",
      duration: "4:55",
      youtubeUrl: "https://www.youtube.com/watch?v=k4V3Mo61fJM"
    },
    {
      title: "The Scientist",
      artist: "Coldplay",
      duration: "5:09",
      youtubeUrl: "https://www.youtube.com/watch?v=RB-RcX5DS5A"
    },
    {
      title: "Mad World",
      artist: "Gary Jules",
      duration: "3:09",
      youtubeUrl: "https://www.youtube.com/watch?v=4N3N1MlvVc4"
    }
  ],

  energetic: [
    {
      title: "Stronger",
      artist: "Kanye West",
      duration: "5:12",
      youtubeUrl: "https://www.youtube.com/watch?v=PsO6ZnUZI0g"
    },
    {
      title: "Eye of the Tiger",
      artist: "Survivor",
      duration: "4:05",
      youtubeUrl: "https://www.youtube.com/watch?v=btPJPFnesV4"
    },
    {
      title: "We Will Rock You",
      artist: "Queen",
      duration: "2:02",
      youtubeUrl: "https://www.youtube.com/watch?v=-tJYN-eG1zk"
    },
    {
      title: "Thunderstruck",
      artist: "AC/DC",
      duration: "4:52",
      youtubeUrl: "https://www.youtube.com/watch?v=v2AC41dglnM"
    },
    {
      title: "Lose Yourself",
      artist: "Eminem",
      duration: "5:26",
      youtubeUrl: "https://www.youtube.com/watch?v=_Yhyp-_hX2s"
    },
    {
      title: "Remember the Name",
      artist: "Fort Minor",
      duration: "3:50",
      youtubeUrl: "https://www.youtube.com/watch?v=VDvr08sCPOc"
    }
  ],

  relaxed: [
    {
      title: "Weightless",
      artist: "Marconi Union",
      duration: "8:10",
      youtubeUrl: "https://www.youtube.com/watch?v=UfcAVejslrU"
    },
    {
      title: "Claire de Lune",
      artist: "Debussy",
      duration: "5:03",
      youtubeUrl: "https://www.youtube.com/watch?v=CvFH_6DNRCY"
    },
    {
      title: "River Flows in You",
      artist: "Yiruma",
      duration: "3:10",
      youtubeUrl: "https://www.youtube.com/watch?v=7maJOI3QMu0"
    },
    {
      title: "Comptine d'un autre été",
      artist: "Yann Tiersen",
      duration: "2:20",
      youtubeUrl: "https://www.youtube.com/watch?v=lvCErYl62Zs"
    },
    {
      title: "Gymnopedie No. 1",
      artist: "Erik Satie",
      duration: "3:18",
      youtubeUrl: "https://www.youtube.com/watch?v=S-Xm7s9eGxU"
    },
    {
      title: "Moonlight Sonata",
      artist: "Beethoven",
      duration: "15:28",
      youtubeUrl: "https://www.youtube.com/watch?v=4Tr0otuiQuU"
    }
  ],

  angry: [
    {
      title: "Break Stuff",
      artist: "Limp Bizkit",
      duration: "2:46",
      youtubeUrl: "https://www.youtube.com/watch?v=JdmLXxBl4UU"
    },
    {
      title: "Given Up",
      artist: "Linkin Park",
      duration: "3:09",
      youtubeUrl: "https://www.youtube.com/watch?v=1s0hNIckNW4"
    },
    {
      title: "Killing in the Name",
      artist: "Rage Against the Machine",
      duration: "5:13",
      youtubeUrl: "https://www.youtube.com/watch?v=bWXazVhlyxQ"
    },
    {
      title: "Bodies",
      artist: "Drowning Pool",
      duration: "3:45",
      youtubeUrl: "https://www.youtube.com/watch?v=04F4xlWSFh0"
    },
    {
      title: "Down with the Sickness",
      artist: "Disturbed",
      duration: "4:38",
      youtubeUrl: "https://www.youtube.com/watch?v=09LTT0xwdfg"
    },
    {
      title: "Chop Suey!",
      artist: "System of a Down",
      duration: "3:30",
      youtubeUrl: "https://www.youtube.com/watch?v=CSvFpBOe8eY"
    }
  ],

  chill: [
    {
      title: "The Sound of Silence",
      artist: "Disturbed",
      duration: "4:08",
      youtubeUrl: "https://www.youtube.com/watch?v=Bk7RVw3I8eg"
    },
    {
      title: "Skinny Love",
      artist: "Bon Iver",
      duration: "3:58",
      youtubeUrl: "https://www.youtube.com/watch?v=6c1BJs6TDgw"
    },
    {
      title: "Holocene",
      artist: "Bon Iver",
      duration: "5:36",
      youtubeUrl: "https://www.youtube.com/watch?v=TWcyIpul8OE"
    },
    {
      title: "Flume",
      artist: "Bon Iver",
      duration: "3:39",
      youtubeUrl: "https://www.youtube.com/watch?v=0J2QdDbelmY"
    },
    {
      title: "Re: Stacks",
      artist: "Bon Iver",
      duration: "6:41",
      youtubeUrl: "https://www.youtube.com/watch?v=6c1BJs6TDgw"
    },
    {
      title: "Blood Bank",
      artist: "Bon Iver",
      duration: "4:45",
      youtubeUrl: "https://www.youtube.com/watch?v=6c1BJs6TDgw"
    }
  ]
}; 