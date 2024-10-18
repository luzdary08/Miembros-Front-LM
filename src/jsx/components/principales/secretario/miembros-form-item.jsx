import React from 'react'

export default function MiembrosFormItem({type = 'input', name,register,errors,label,message,placeholder,children,typeInput = 'text', maxLength = 0, pattern = ""}) {
    
     const z = maxLength != 0 ? {maxLength: { value: maxLength }} : {}
     const y = pattern != "" ? {pattern: { value: pattern, message: 'Formato de email inválido' }} : {} 
     const validationRules = typeInput === 'date' 
        ? {} 
        : { required: { value: true } }; 

    if (type === 'input') return (
        <div className="mb-3 col-md-4">
            <label htmlFor={name}>{label}</label>
            <input
                
                type={typeInput}
                className="form-control form-control-sm"
                placeholder={placeholder}
                {...register(name, validationRules )}
                />
            {errors[name] && <div className="text-danger mt-2 message">{errors[name].message}</div>}
        </div>
    )

    if (type === 'select') return (
        <div className="mb-3 col-md-4">
            <label htmlFor={name}>{label}</label>
            <select
                style={{marginTop:-2.5}}
                id={name}
                name={name}
                autoComplete="off"
                className="form-control"
                {...register(name, { required: { value: true} })}
            >
                <option disabled value="">Seleccionar...</option>
                {children}
            </select>
            {errors[name] && <div className="text-danger message mt-2">{errors[name].message}</div>}
        </div>
    )


  
}

