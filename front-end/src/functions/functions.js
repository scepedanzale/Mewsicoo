
export function albumDuration(album){
    if(album.duration){
        const minutes = album.duration / 60;
        let duration = minutes.toLocaleString('it-IT', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true
        }) +' min';

        if (minutes > 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = Math.floor(minutes % 60);
            duration = hours + " ora e " + remainingMinutes + " min";
        }

        return (duration);
    }
}

export function formattedDate (created_at) {
    const date = new Date(created_at)
    const formattedDate = date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    return (formattedDate);
}

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
