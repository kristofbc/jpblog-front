export function formatDate(date:Date):string {
    const day = date.getDate();
    const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][date.getMonth()];
    const year = date.getFullYear();
    
    return [day, month, year].join(' ');
}