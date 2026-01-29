import { Mood, Song } from '../models/mood.model';

export const MOODS: Mood[] = [
  {
    id: 'happy',
    name: 'Happy',
    emoji: '😊',
    description: 'Feeling joyful and upbeat',
    color: '#FFD700'
  },
  {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    description: 'Feeling down and melancholic',
    color: '#87CEEB'
  },
  {
    id: 'chill',
    name: 'Chill',
    emoji: '😎',
    description: 'Feeling relaxed and laid-back',
    color: '#98FB98'
  },
  {
    id: 'energetic',
    name: 'Energetic',
    emoji: '💪',
    description: 'Feeling pumped and powerful',
    color: '#FF6B6B'
  },
  {
    id: 'angry',
    name: 'Angry',
    emoji: '😡',
    description: 'Feeling frustrated and intense',
    color: '#FF4500'
  },
  {
    id: 'relaxed',
    name: 'Relaxed',
    emoji: '🧘',
    description: 'Feeling peaceful and calm',
    color: '#DDA0DD'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    emoji: '💕',
    description: 'Feeling love and passion',
    color: '#FFB6C1'
  },
  {
    id: 'nostalgic',
    name: 'Nostalgic',
    emoji: '🌅',
    description: 'Feeling sentimental and reflective',
    color: '#F0E68C'
  }
];

export const PLAYLISTS: { [key: string]: Song[] } = {
  happy: [
    { title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', link: 'https://www.youtube.com/watch?v=y6Sxv-sUYtM' },
    { title: 'Good Time', artist: 'Owl City & Carly Rae Jepsen', duration: '3:27', link: 'https://www.youtube.com/watch?v=2X_2IdybTV0' },
    { title: 'Walking on Sunshine', artist: 'Katrina & The Waves', duration: '3:58', link: 'https://www.youtube.com/watch?v=iPUmE-tne5U' },
    { title: 'I Gotta Feeling', artist: 'The Black Eyed Peas', duration: '4:49', link: 'https://www.youtube.com/watch?v=uSD4vsh1zBA' },
    { title: 'Shake It Off', artist: 'Taylor Swift', duration: '3:39', link: 'https://www.youtube.com/watch?v=nfWlot6h_JM' },
    { title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', duration: '3:56', link: 'https://www.youtube.com/watch?v=ru0K8uYEZWw' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', duration: '3:55', link: 'https://www.youtube.com/watch?v=OPf0YbXqDm0' },
    { title: 'Best Day of My Life', artist: 'American Authors', duration: '3:14', link: 'https://www.youtube.com/watch?v=Y66j_BUCBMY' }
  ],
  sad: [
    { title: 'Someone Like You', artist: 'Adele', duration: '4:45', link: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0' },
    { title: 'All of Me', artist: 'John Legend', duration: '4:29', link: 'https://www.youtube.com/watch?v=450p7goxZqg' },
    { title: 'Say Something', artist: 'A Great Big World & Christina Aguilera', duration: '3:49', link: 'https://www.youtube.com/watch?v=-2U0Ivkn2Ds' },
    { title: 'Fix You', artist: 'Coldplay', duration: '4:55', link: 'https://www.youtube.com/watch?v=k4V3Mo61fJM' },
    { title: 'The Scientist', artist: 'Coldplay', duration: '5:09', link: 'https://www.youtube.com/watch?v=RB-RcX5DS5A' },
    { title: 'Mad World', artist: 'Gary Jules', duration: '3:09', link: 'https://www.youtube.com/watch?v=4N3N1MlvVc4' },
    { title: 'Hallelujah', artist: 'Jeff Buckley', duration: '6:53', link: 'https://www.youtube.com/watch?v=y8AWFf7EAc4' },
    { title: 'Creep', artist: 'Radiohead', duration: '3:58', link: 'https://www.youtube.com/watch?v=XFkzRNyygfk' }
  ],
  chill: [
    { title: 'Weightless', artist: 'Marconi Union', duration: '8:10', link: 'https://www.youtube.com/watch?v=UfcAVejslrU' },
    { title: 'Claire de Lune', artist: 'Debussy', duration: '5:03', link: 'https://www.youtube.com/watch?v=CvFH_6DNRCY' },
    { title: 'River Flows in You', artist: 'Yiruma', duration: '3:10', link: 'https://www.youtube.com/watch?v=7maJOI3QMu0' },
    { title: 'Comptine d\'un autre été', artist: 'Yann Tiersen', duration: '2:20', link: 'https://www.youtube.com/watch?v=lvCErYl62Zs' },
    { title: 'Gymnopedie No. 1', artist: 'Erik Satie', duration: '3:18', link: 'https://www.youtube.com/watch?v=S-Xm7s9eGxU' },
    { title: 'Moonlight Sonata', artist: 'Beethoven', duration: '15:28', link: 'https://www.youtube.com/watch?v=4Tr0otuiQuU' },
    { title: 'The Sound of Silence', artist: 'Disturbed', duration: '4:08', link: 'https://www.youtube.com/watch?v=Bk7RVw3I8eg' },
    { title: 'Skinny Love', artist: 'Bon Iver', duration: '3:58', link: 'https://www.youtube.com/watch?v=6c1BJs6TDgw' }
  ],
  energetic: [
    { title: 'Stronger', artist: 'Kanye West', duration: '5:12', link: 'https://www.youtube.com/watch?v=PsO6ZnUZI0g' },
    { title: 'Eye of the Tiger', artist: 'Survivor', duration: '4:05', link: 'https://www.youtube.com/watch?v=btPJPFnesV4' },
    { title: 'We Will Rock You', artist: 'Queen', duration: '2:02', link: 'https://www.youtube.com/watch?v=-tJYN-eG1zk' },
    { title: 'Thunderstruck', artist: 'AC/DC', duration: '4:52', link: 'https://www.youtube.com/watch?v=v2AC41dglnM' },
    { title: 'Lose Yourself', artist: 'Eminem', duration: '5:26', link: 'https://www.youtube.com/watch?v=_Yhyp-_hX2s' },
    { title: 'Remember the Name', artist: 'Fort Minor', duration: '3:50', link: 'https://www.youtube.com/watch?v=VDvr08sCPOc' },
    { title: 'The Final Countdown', artist: 'Europe', duration: '5:10', link: 'https://www.youtube.com/watch?v=9jK-NcRmVcw' },
    { title: 'Don\'t Stop Believin\'', artist: 'Journey', duration: '4:11', link: 'https://www.youtube.com/watch?v=1k8craCGpgs' }
  ],
  angry: [
    { title: 'Break Stuff', artist: 'Limp Bizkit', duration: '2:46', link: 'https://www.youtube.com/watch?v=JdmLXxBl4UU' },
    { title: 'Given Up', artist: 'Linkin Park', duration: '3:09', link: 'https://www.youtube.com/watch?v=1s0hNIckNW4' },
    { title: 'Killing in the Name', artist: 'Rage Against the Machine', duration: '5:13', link: 'https://www.youtube.com/watch?v=bWXazVhlyxQ' },
    { title: 'Bodies', artist: 'Drowning Pool', duration: '3:45', link: 'https://www.youtube.com/watch?v=04F4xlWSFh0' },
    { title: 'Down with the Sickness', artist: 'Disturbed', duration: '4:38', link: 'https://www.youtube.com/watch?v=09LTT0xwdfg' },
    { title: 'Chop Suey!', artist: 'System of a Down', duration: '3:30', link: 'https://www.youtube.com/watch?v=CSvFpBOe8eY' },
    { title: 'Du Hast', artist: 'Rammstein', duration: '3:54', link: 'https://www.youtube.com/watch?v=W3q8Od5qJio' },
    { title: 'The Beautiful People', artist: 'Marilyn Manson', duration: '3:42', link: 'https://www.youtube.com/watch?v=Ypkv0HeUvTc' }
  ],
  relaxed: [
    { title: 'Weightless', artist: 'Marconi Union', duration: '8:10', link: 'https://www.youtube.com/watch?v=UfcAVejslrU' },
    { title: 'Claire de Lune', artist: 'Debussy', duration: '5:03', link: 'https://www.youtube.com/watch?v=CvFH_6DNRCY' },
    { title: 'River Flows in You', artist: 'Yiruma', duration: '3:10', link: 'https://www.youtube.com/watch?v=7maJOI3QMu0' },
    { title: 'Comptine d\'un autre été', artist: 'Yann Tiersen', duration: '2:20', link: 'https://www.youtube.com/watch?v=lvCErYl62Zs' },
    { title: 'Gymnopedie No. 1', artist: 'Erik Satie', duration: '3:18', link: 'https://www.youtube.com/watch?v=S-Xm7s9eGxU' },
    { title: 'Moonlight Sonata', artist: 'Beethoven', duration: '15:28', link: 'https://www.youtube.com/watch?v=4Tr0otuiQuU' },
    { title: 'The Sound of Silence', artist: 'Disturbed', duration: '4:08', link: 'https://www.youtube.com/watch?v=Bk7RVw3I8eg' },
    { title: 'Skinny Love', artist: 'Bon Iver', duration: '3:58', link: 'https://www.youtube.com/watch?v=6c1BJs6TDgw' }
  ],
  romantic: [
    { title: 'Perfect', artist: 'Ed Sheeran', duration: '4:23', link: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g' },
    { title: 'All of Me', artist: 'John Legend', duration: '4:29', link: 'https://www.youtube.com/watch?v=450p7goxZqg' },
    { title: 'Just the Way You Are', artist: 'Bruno Mars', duration: '3:40', link: 'https://www.youtube.com/watch?v=LjhCEhWiKXk' },
    { title: 'A Thousand Years', artist: 'Christina Perri', duration: '4:45', link: 'https://www.youtube.com/watch?v=rtOvBOTyX00' },
    { title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley', duration: '3:00', link: 'https://www.youtube.com/watch?v=vGJTaP6anOU' },
    { title: 'Wonderwall', artist: 'Oasis', duration: '4:18', link: 'https://www.youtube.com/watch?v=bx1Bh8ZvH84' },
    { title: 'I Will Always Love You', artist: 'Whitney Houston', duration: '4:31', link: 'https://www.youtube.com/watch?v=3JWTaaS7LdU' },
    { title: 'Unchained Melody', artist: 'The Righteous Brothers', duration: '3:38', link: 'https://www.youtube.com/watch?v=qiiyq2xrSI0' }
  ],
  nostalgic: [
    { title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', link: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ' },
    { title: 'Hotel California', artist: 'Eagles', duration: '6:30', link: 'https://www.youtube.com/watch?v=BciS5krYL80' },
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02', link: 'https://www.youtube.com/watch?v=QkF3oxziUI4' },
    { title: 'Imagine', artist: 'John Lennon', duration: '3:03', link: 'https://www.youtube.com/watch?v=YkgkThdzX-8' },
    { title: 'Yesterday', artist: 'The Beatles', duration: '2:05', link: 'https://www.youtube.com/watch?v=ONXp-vpE9eU' },
    { title: 'Bridge Over Troubled Water', artist: 'Simon & Garfunkel', duration: '4:53', link: 'https://www.youtube.com/watch?v=4G-YQA_bsOU' },
    { title: 'The Sound of Silence', artist: 'Simon & Garfunkel', duration: '3:05', link: 'https://www.youtube.com/watch?v=4fWyzwo1xg0' },
    { title: 'Blowin\' in the Wind', artist: 'Bob Dylan', duration: '2:48', link: 'https://www.youtube.com/watch?v=3l4nVByCL44' }
  ]
}; 