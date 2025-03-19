import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { apiGoal } from '@/utils/goalData/FetchGoal'
import { useRouter } from 'next/navigation'
import Label from '@/components/ui/Label'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Swal from 'sweetalert2'

export default function GoalForm() {
	const router = useRouter();

	const objectives = [
		'Proyecto personal', 'Educacion', 'Celebracion', 'Comprar un vehiculo',
		'Vacaciones y viajes', 'Comprar una casa', 'Retiro', 'Hobbie', 'Inversion',
		'Compra de equipos', 'Fondo de emergencia','Otro'
	];

	const validationSchema = Yup.object({
		description: Yup.string()
			.min(3, 'El nombre debe tener al menos 3 caracteres')
			.required('El nombre es obligatorio'),
		amountObjective: Yup.number()
			.typeError('Debe ser un número')
			.positive('Debe ser un valor positivo')
			.required('El valor total es obligatorio'),
		frequency: Yup.string().required('La frecuencia es obligatoria'),
		startDate: Yup.date().required('La fecha es obligatoria'),
		targetDate: Yup.date().required('La fecha es obligatoria'),
		objectiveType: Yup.string().required('El tipo de meta es obligatorio'),
	});

	const formik = useFormik({
		initialValues: {
			description: '',
			amountObjective: 0,
			frequency: '',
			startDate: new Date(),
			targetDate: new Date(),
			objectiveType: '' ,
			idGoal: 0,
			amount: 0,
			progress: 0,
			status: "pending"
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				await apiGoal.create(values);
				Swal.fire({
					icon: 'success',
					title: 'Meta creada con exito',
					showConfirmButton: false,
					timer: 1500
				})
				router.push('/app/home');
			} catch (error) {
				console.log(error);
			}
		}
	});

	return (
		<form onSubmit={formik.handleSubmit} className='h-screen'>
			<div className='mb-8'>
				<Label className='text-h6-semibold mb-2' htmlFor='description'>Nombre</Label>
				<Input
					id='description'
					type='text'
					name='description'
					placeholder='Ej: Comprar un libro'
					className='w-full p-3 h-[56px] border rounded-md'
					onChange={formik.handleChange}
					value={formik.values.description}
				/>
				{formik.touched.description && formik.errors.description && (
					<p className='text-red-500 text-xs'>{formik.errors.description}</p>
				)}
			</div>

			<div className='mb-8'>
				<Label className='text-h6-semibold mb-2'>Tiempo</Label>
				<div className='flex gap-4'>
					<div className='flex'>
						{/* Botón para ilustración (no envía el formulario) */}
						<button type="button" className='border rounded-md p-3'>📍</button>
						<Input
							id='startDate'
							type='date'
							name='startDate'
							className='w-full p-3 border rounded-md'
							onChange={formik.handleChange}
							value={new Date(formik.values.startDate).toISOString().split('T')[0]} 
						/>
					</div>
					<div className='flex'>
						<button type="button" className='border rounded-md p-3'>🏁</button>
						<Input
							id='targetDate'
							type='date'
							name='targetDate'
							className='w-full p-3 border rounded-md'
							onChange={formik.handleChange}
							value={new Date(formik.values.targetDate).toISOString().split('T')[0]} 
						/>
					</div>
				</div>
			</div>

			<div className='mb-8'>
				<Label className='text-h6-semibold mb-2'>Valor total</Label>
				<Input
					id='amountObjective'
					type='number'
					name='amountObjective'
					placeholder='Ej: 1000'
					className='w-full p-3 border rounded-md'
					onChange={formik.handleChange}
					value={formik.values.amountObjective}
				/>
				{formik.touched.amountObjective && formik.errors.amountObjective && (
					<p className='text-red-500 text-xs'>{formik.errors.amountObjective}</p>
				)}
			</div>

			<div className='mb-8'>
				<Label className='text-h6-semibold mb-2'>Frecuencia</Label>
				<select
					name="frequency"
					id="frequency"
					className='w-fit p-3 border rounded-md'
					onChange={formik.handleChange}
					value={formik.values.frequency}
				>
					<option value="">Seleccione frecuencia</option>
					<option value="Semanal">Semanal</option>
					<option value="Mensual">Mensual</option>
					<option value="Anual">Anual</option>
				</select>
				{formik.touched.frequency && formik.errors.frequency && (
					<p className='text-red-500 text-xs'>{formik.errors.frequency}</p>
				)}
			</div>

			<div className='mb-8'>
				<Label className='text-h6-semibold mb-2'>Tipo de meta</Label>
				<p className='text-sm text-gray-600 mb-3'>¿En cuál categoría de estas podría estar tu meta?</p>
				<div className='grid grid-cols-3 gap-3'>
					{objectives.map((objective) => (
						<button
							key={objective}
							type='button'
							className={`px-4 py-2 rounded-full w-fill border flex items-center gap-2
                ${formik.values.objectiveType === objective ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}
                hover:bg-blue-300 transition`}
							onClick={() => formik.setFieldValue('objectiveType', objective)}
						>
							{objective === 'Comprar un vehículo' && '🚓'}
							{objective === 'Vacaciones y viajes' && '✈️'}
							{objective === 'Retiro' && '👔'}
							{objective === 'Inversión' && '💰'}
							{objective === 'Compra de equipos' && '🎮'}
							{objective === 'Fondo de emergencia' && '💰'}
							{objective === 'Comprar una casa' && '🏠'}
							{objective === 'Educación' && '📕'}
							{objective === 'Celebración' && '🎉'}
							{objective === 'Hobbie' && '🎮'}
							{objective === 'Proyecto personal' && '📝'}
							{objective === 'Viajar' && '🌍'}
							{objective === 'Otro' && '📝'}
							{objective}
						</button>
					))}
				</div>
				{formik.touched.objectiveType && formik.errors.objectiveType && (
					<p className='text-red-500 text-xs mt-2'>{formik.errors.objectiveType}</p>
				)}
			</div>
			<div className='flex justify-center'>
				<Button
					variant='solid'
					size='medium'
					type='submit'
					className='rounded-3xl w-1/2'
				>
					Crear meta
				</Button>
			</div>
		</form>
	)
}


