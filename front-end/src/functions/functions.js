
/* durata album/track */
export function albumDuration(duration){
        const minutes = duration / 60;
        let d = minutes.toLocaleString('it-IT', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        }) +' min';

        if (minutes > 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = Math.floor(minutes % 60);
            d = hours + " ora e " + remainingMinutes + " min";
        }

        return (d);
}

/* durata track */
export function formatSeconds(seconds) {
    if (seconds < 60) {
        return seconds + " sec";
    } else {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
        return minutes + "," + (remainingSeconds < 10 ? '0' : '') + remainingSeconds + " min";
    }
}

/* formattazione data */
export function formattedDate (created_at) {
    const date = new Date(created_at)
    const formattedDate = date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    return (formattedDate);
}

/* ordinazione post */
export function descendingOrderPost (users) {
    const array = []
    if (Array.isArray(users)) {
        users.forEach((user) => {
            user.posts.forEach((post) => {
                array.push({
                    user: user,
                    post: post
                });
            });
        });
    }else{
        users.posts.forEach((post) => {
            array.push(post);
        });
    }
    array.sort((a, b) => {
        const dateA = new Date(a.post ? a.post.created_at : a.created_at);
        const dateB = new Date(b.post ? b.post.created_at : b.created_at);
      return dateB - dateA; // Ordine decrescente
    });
    return array;
}


/* cutting text */
export function truncateText(text, nChars) {
  if (text.length > nChars) {
      return text.slice(0, nChars);
  }
  return text;
}