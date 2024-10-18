import z from "zod"

export const User = z.object({
    form_nombres:z
    .string().min(1,{message:'Ingrese un nombre'}).regex(/^[a-zA-Z\s]+$/,{message:'Ingrese un nombre válido'}),

    form_apellido_paterno:z
    .string().min(1, {message:'Ingrese un apellido paterno'}).regex(/^[a-zA-Z\s]+$/, {message:'Ingrese un apellido válido'}) ,

    form_apellido_materno:z
    .string().min(1,{message:'ingrese un apellido materno'}).regex(/^[a-zA-Z\s]+$/,{message:'Ingrese un apellido válido'}), 

    form_tipo_documento:z
    .string().min(1,{message:'ingrese un tipo de documento'}).transform(value => Number(value)),

    form_fecha_nacimiento:z
    .string().min(1,{message:'Ingrese una fecha'}),

    form_estado:z
    .string().min(1,{message:'ingrese un estado'}).transform(value => Number(value)),

    form_sexo:z
    .string().min(1,{message:'ingrese un género'}).transform(value => Number(value)),

    form_iglesia:z
    .string({message:'Ingrese una iglesia'}),
    
    form_estados_civil:z
    .string().min(1,{message:'ingrese un estado civil'}).refine(value => Number(value)),

    form_telefono_fijo:z
    .string().min(1,{message:'Ingrese un teléfono'}).max(11,{message:'Ingrese un teléfono real'}).regex(/^[\d]+$/,{message:'Ingrese un telèfono válido'}),  
    
    form_telefono_celular:z
    .string().min(1,{message:'Ingrese un teléfono'}).max(11,{message:'Ingrese un celular real'}).regex(/^[\d]+$/,{message:'Ingrese un celular válido'}),  

    form_email:z
    .string().email({message:'Ingrese un email válido'}),

    form_direccion:z
    .string().min(1,{message:'Ingrese una dirección'}),

    form_convencimiento_doctrina:z
    .string().min(1,{message:'Seleccione una opoción'}).transform(value => Number(value)),
    
    form_dias_visita:z
    .string().min(1,{message:'Seleccione una opoción'}).transform(value => Number(value)),

    form_horas_visita:z
    .string().min(1,{message:'Seleccione una opoción'}).transform(value => Number(value)),

    form_dones:z.string({message:'seleccione al menos una opcion'}).array().nonempty({message:'seleccione al menos una opcion'}),

    form_departamentos:z
    .string().min(1,{message:'Seleccione un departamento'}).transform(value => Number(value)),
    
    form_distritos:z
    .string().min(1,{message:'Seleccione un distrito'}).transform(value => Number(value)),

    form_provincias:z
    .string().min(1,{message:'Seleccione una provincia'}).transform(value => Number(value)),

    //  form_hijos_nombres: z.number().optional(),

    form_tipo_registro: z
    .string().min(1,{message:'selecciona una opción'}).transform(n => Number(n)),

    form_estudios_seculares: z.
    string({message:'seleccione al menos una opcion'}).array().nonempty({message:'seleccione al menos una opcion'}),
    
    form_numero_documento: z
    .string().min(1,{message:'ingrese el numero de documento'}).transform(value => Number(value)),
    
    form_fecha_conversion: z
    .string().min(1,{message:'Ingrese una fecha'}),

    form_fecha_traslado: z
    .string().min(1,{message:'Ingrese una fecha'}),

    //Futuro problema
    form_estudios_eclesiasticos:z
    .string({message:'seleccione al menos una opcion'}).array().nonempty({message:'seleccione al menos una opcion'}),

    // form_apellido_paterno_conyuge:z
    // .string().min(1, {message:'Ingrese un apellido'}).regex(/^[a-zA-Z]+$/, {message:'Ingrese un apellido válido'}).optional() ,


    // form_apellido_materno_conyuge:z
    // .string().min(1, {message:'Ingrese un apellido'}).regex(/^[a-zA-Z]+$/, {message:'Ingrese un apellido válido'}).optional() ,
    
    // form_nombres_conyuge:z
    // .string().min(1, {message:'Ingrese un nombre'}).regex(/^[a-zA-Z]+$/, {message:'Ingrese un apellido nombre'}).optional() ,

    form_fecha_bautizo: z
    .string().min(1,{message:'Ingrese una fecha'}),
    
    form_mayordomia_fiel: z
    .string().min(1, {message:'Ingrese una mayordomía'}) ,

    form_gdc: z
    .string().min(1,{message:'Ingrese un numero de gdc'}).max(4,{message:'Ingrese un numero de gdc'}).regex(/^[\d]+$/,{message:'Ingrese un numero de gdc'}),  
    
    form_gps: z
    .string().min(1,{message:'Ingrese un numero de gps'}).max(4,{message:'Ingrese un numero de gps'}).regex(/^[\d]+$/,{message:'Ingrese un numero de gps'}),  
    
    form_cm: z
    .string().min(1,{message:'Ingrese un numero de cm'}).max(4,{message:'Ingrese un numero de cm'}).regex(/^[\d]+$/,{message:'Ingrese un numero de cm'}),  
    
    form_mision: z
    .string().min(1,{message:'Ingrese una misión'}),

    form_fecha_observado:z 
    .string().min(1,{message:'Ingrese una fecha'}),

    form_experiencias_espirituales: z
    .string().min(1,{message:'Ingrese una experiencia'}),
    
    form_ministro_bautizmo: z
    .string({message:'Ingrese una iglesia'}),
    
}) 