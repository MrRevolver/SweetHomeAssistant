export type TDeviceType = {
   id_devicetype: number;
   id_state: number;
   prefix: string;
   name: string;
   remark: string;
   dset: string;
};

export type TDeviceItem = {
   error_text?: string;
   id_device: number;
   parent: number;
   id_devicetype: number;
   id_project: number;
   id_state: number;
   name: string;
   remark: string;
   dset: string;
};

export type TInnerPins = {
   id_unitslotpin: number;
   id_pintype: number;
   id_pinelectricaltype: number;
   npin: number;
   remark: string | null;
   fromsvg: string | null;
   name: number;
   typename: string;
   typedescription: string | null;
};

export type TInnerSlots = {
   id_unitslot: number;
   id_slottype: number;
   id_slotlocation: number;
   name: string;
   pins: TInnerPins[];
};

export type TInnerPorts = {
   id_unitport: number;
   id_porttype: number;
   id_unit: number;
   id_unitslotpin: number;
   isdigital: boolean;
   isin: boolean;
   nport: number;
   nunit: number;
   typedescription: string | null;
   typename: string;
};

export type TSlotImage = {
   id_schematictype: number;
   image: string;
   transform: string;
};

export type TUnitImage = {
   id_schematictype: number;
   image: string;
};

export type TUnitSlot = {
   id_unitslot: number;
   id_slottype: number;
   name: string;
   images: TSlotImage[];
};

export type TInnerUnits = {
   id_unit: number;
   id_unittype: number;
   isexternal: number;
   id_unittypegroup: number;
   nunit: number;
   name: string;
   remark: string;
   images: TUnitImage[];
   slots: TUnitSlot[];
};

export type TDeviceFamily = {
   error_text?: string;
   id_device: number;
   parent: number;
   id_project: number;
   name: string;
   remark: string;
   config: string;
   id_state: number;
   dset: string;
   locations: {
      [id_locationtype: number]: {
         x: number;
         y: number;
      };
   };
   units: TInnerUnits[];
   ports: TInnerPorts[];
   slots: TInnerSlots[];
   softwarecode: string;
};

export type TFormCreateDevice = {
   id_devicetype?: number;
   id_project: number;
   name: string;
   remark: string;
};

export type TFormEditDevice = {
   id_device: number;
   id_devicetype?: number;
   name: string;
   remark: string;
   id_hardware: number;
};

export type TDeviceSoftware = {
   error_text?: string;
   id_softwarecode: number;
   id_device: number;
   code: string;
   id_state: number;
   dset: string;
};

export type TDevicePosition = {
   id_device: TDeviceFamily['id_device'];
   id_locationtype: number;
   x: number;
   y: number;
};

export type TDeviceSoftwareOrder = {
   id_device: number;
   code: string;
   ports: string;
   mode: string;
};

export type TDeviceSoftwareCompilationLog = {
   level?: number;
   text: string | TDeviceSoftwareCompilationError[];
   time?: number;
   error?: TDeviceSoftwareCompilationError;
};

export type TDeviceSoftwareCompilationError = {
   line: number;
   message: string;
   position: number;
};

export type TDeviceSoftwareCompilation = {
   error_text?: string;
   errors?: TDeviceSoftwareCompilationError[];
   arg?: [];
   ast?: [];
   ecompil?: [];
   elex?: [];
   eparse?: [];
   esymantic?: [];
   eventindex?: [];
   fout?: [];
   log?: TDeviceSoftwareCompilationLog[];
   nodeevent?: [];
   out_path?: string;
   result?: {
      code: number;
      message: string;
   };
   stat?: [];
   tokens?: [];
   warning?: [];
};

export type TDeviceSoftwareFileClean = {
   error_text?: string;
};
