export function formatDate(date:Date):string {
    const day = date.getDate();
    const month = ['Janvier', 'Février', 'Mars', 'Avril', 'May', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][date.getMonth()-1];
    const year = date.getFullYear();
    console.log(date);
    
    return [day, month, year].join(' ');
}