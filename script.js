const tracks = [
  {
    title: 'Star Girl', artist: 'Navaan Sandhu', file: 'assets/songs/01-star-girl.mp3',
    line: 'Aapki apni hi ek shine hai — bina kuch kiye bhi notice ho jaati hain.'
  },
  {
    title: 'Chann', artist: 'Arijit Singh · Udta Teer', file: 'assets/songs/02-chann.mp3',
    line: 'Aapki smile mein woh sukoon hai similar to the shining moon in the sky at night'
  },
  {
    title: 'Mahiya', artist: 'Badshah & Shreya Ghoshal', file: 'assets/songs/03-mahiya.mp3',
    line: 'Zikr na tera to ye Baate kis Kaam ki'
  },
  {
    title: 'Gehra Hua', artist: 'Arijit Singh', file: 'assets/songs/05-gehra-hua.mp3',
    line: 'Kuch log dheere-dheere aur gehre hote jaate hain — aap unmein se ek hain.'
  },
  {
    title: 'Deewane', artist: 'Navaan Sandhu', file: 'assets/songs/06-deewane.mp3',
    line: 'Aapke expressions aur hasi ka apna hi fan club hona chahiye.'
  },
  {
    title: 'Spellbound', artist: 'Dhanda Nyoliwala', file: 'assets/songs/07-spellbound.mp3',
    line: 'Aapki personality mein kuch aisa hai jo bina koshish ke mesmerise kar deta hai.'
  },
  {
    title: 'Tu Mil Jaaye', artist: 'Arijit Singh · KING', file: 'assets/songs/08-tu-mil-jaaye.mp3',
    line: 'Aapki company mil jaaye toh ordinary day bhi special lagta hai.'
  },
  {
    title: 'Ban Ja Tu', artist: 'Badshah & Charanpreet', file: 'assets/songs/09-ban-ja-tu.mp3',
    line: 'Aapko badalne ki zaroorat nahi — aap jaisi hain, waise hi pyaari hain.'
  },
  {
    title: 'For A Reason', artist: 'Karan Aujla', file: 'assets/songs/10-for-a-reason.mp3',
    line: 'Maybe life really does get better for a reason, and for me, that reason is you, Dishaaaa ji.♡ '
  },
  {
    title: 'Jaat Gelya Yaari', artist: 'Naveen Punia', file: 'assets/songs/11-jaat-gelya-yaari.mp3',
    line: 'Mandatory anthem for Jaat Sahab😂'
  }
];

const root = document.getElementById('songs');
const audio = document.getElementById('audioPlayer');
const nowTitle = document.getElementById('nowTitle');
const nowArtist = document.getElementById('nowArtist');
const trackCount = document.getElementById('trackCount');
const playerMessage = document.getElementById('playerMessage');
let activeIndex = -1;

function setCardState(index, isPlaying) {
  document.querySelectorAll('.song').forEach((card, i) => {
    const active = i === index;
    card.classList.toggle('active', active);
    const icon = card.querySelector('.play');
    icon.textContent = active && isPlaying ? 'Ⅱ' : '▶';
    icon.setAttribute('aria-label', `${active && isPlaying ? 'Pause' : 'Play'} ${tracks[i].title}`);
  });
}

function selectTrack(index) {
  const track = tracks[index];
  if (activeIndex === index && !audio.paused) {
    audio.pause();
    return;
  }
  if (activeIndex !== index) {
    activeIndex = index;
    audio.src = track.file;
    audio.load();
    nowTitle.textContent = track.title;
    nowArtist.textContent = track.artist;
    trackCount.textContent = `TRACK ${String(index + 1).padStart(2, '0')} / ${tracks.length}`;
    playerMessage.textContent = 'Playing from your little playlist ♡';
  }
  const playAttempt = audio.play();
  if (playAttempt && typeof playAttempt.catch === 'function') {
    playAttempt.catch(() => {
      playerMessage.textContent = 'Song load nahi hua? Player par Play dabakar dobara try karein. ♡';
      setCardState(index, false);
    });
  }
  setCardState(index, true);
  document.getElementById('playerPanel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

tracks.forEach((track, index) => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'song';
  card.innerHTML = `
    <span class="num">${String(index + 1).padStart(2, '0')}</span>
    <span class="songbody">
      <span class="songtitle">${track.title}</span>
      <span class="artist">${track.artist}</span>
      <span class="compliment">${track.line}</span>
    </span>
    <span class="play" aria-hidden="true">▶</span>`;
  card.addEventListener('click', () => selectTrack(index));
  root.appendChild(card);
});

audio.addEventListener('play', () => setCardState(activeIndex, true));
audio.addEventListener('pause', () => setCardState(activeIndex, false));
audio.addEventListener('ended', () => setCardState(activeIndex, false));
audio.addEventListener('error', () => {
  if (activeIndex >= 0) {
    playerMessage.textContent = 'Is song ko load karne mein issue aaya. Internet check karke dobara try karein. ♡';
    setCardState(activeIndex, false);
  }
});
