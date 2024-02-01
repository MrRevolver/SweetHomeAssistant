type TOption = {
   command  : number,
   state   ?: number,
   value   ?: number,
   label   ?: string,
   labelOff?: string,
   labelOn ?: string,
}

type TControls = {
   type   : 'Button' | 'RangeInput' | 'Toogle' | 'TextInput'
   options: TOption[]
}

export type TBlock = {
   device? : string,
   name    : string,
   label   : string,
   type    : 'TargetIndication' | 'ControlBlock',
   sign?   : string,
   controls: TControls[]
}

export type TControlPanel = {
   outputs: TBlock[];
}