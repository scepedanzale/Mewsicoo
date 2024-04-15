
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