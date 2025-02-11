import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date): string => {
    if(!date){
        return format(new Date(), "dd/MMM/yyyy", { locale: es });
    }
    
    try{
        return format(date, "dd/MMM/yyyy", { locale: es });
    } catch(err){
        console.log(date);
        console.log(err)
        return "Error" + {err}
    }
}

