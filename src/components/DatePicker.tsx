import { formatDate } from '@/utils/Formatters';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

import React from 'react'
import { Calendar } from './ui/calendar';

type DatePickerProps = {
    isPopoverOpen: boolean;
    setIsPopoverOpen: (isPopOverOpen: boolean) => void;
    selectedDate: Date;
    handleDateSelect: (selectedDate: Date | undefined) => void

}

const DatePicker = ({ isPopoverOpen, setIsPopoverOpen, selectedDate, handleDateSelect }: DatePickerProps) => {

    return (
        <div id="datePicker" className="font-bold cursor-pointer items-center justify-center flex">
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