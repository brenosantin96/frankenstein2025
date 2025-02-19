import React from "react"
import { Icon } from "./svg/Icon";

type Input01Props = {
    inputValue: string;
    labelText: string;
    labelHtmlFor: string;
    colorLabel?: string;
    typeInput: string;
    inputHeightTailwind: string;
    onChange: (newText: string) => void; //no componente pai vou enviar o setState que é uma funcao que vai receber um novo texto.
    icon?: string;
    iconWidth?: number;
    iconHeight?: number;
    iconColor?: string;

}

export const Input01 = ({ labelHtmlFor, labelText, colorLabel = "#949494", typeInput, icon, iconWidth, iconHeight, iconColor, onChange, inputValue, inputHeightTailwind }: Input01Props) => {

    return (
        <React.Fragment>
            <label htmlFor={labelHtmlFor} className="text-sm font-bold" style={{ color: colorLabel }}>{labelText}</label>
            <div className="flex pl-1 bg-white text-gray-700 border text-ice-dark-blue border-ice-dark-blue rounded-md">
                {icon !== undefined &&
                    <div className="flex justify-center items-center">
                        <Icon svg={icon} width={iconWidth} height={iconHeight} color={iconColor} />
                    </div>
                }
                <input
                    id={labelHtmlFor}
                    type={typeInput}
                    className={`${inputHeightTailwind} text-xl py-4 pl-1 border-0 outline-0 bg-transparent focus:outline-none`}
                    onChange={(e) => onChange(e.target.value)}
                    value={inputValue}
                />

            </div>
        </React.Fragment>
    )
}