import { formatDate } from '@/utils/Formatters';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Calendar } from './ui/calendar';
import React from 'react'

type DatePickerProps = {
    isPopoverOpen: boolean;
    setIsPopoverOpen: (isPopOverOpen: boolean) => void;
    selectedDate: Date | undefined;
    handleDateSelect: (selectedDate: Date | undefined) => void

}

const DatePicker = ({ isPopoverOpen, setIsPopoverOpen, selectedDate, handleDateSelect }: DatePickerProps) => {

    return (
        <div id="datePicker" className="font-bold cursor-pointer bg-beige-cornsilk items-center justify-center flex">
            <Popover open={isPopoverOpen} onOpenChange={() => setIsPopoverOpen(true)} >
                <PopoverTrigger onClick={() => setIsPopoverOpen(true)}>{formatDate(selectedDate as Date)}</PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect} // Passando a função setDate diretamente
                        className="rounded-md border"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DatePicker