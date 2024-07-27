// src/components/features/ReservationForm.jsx
import { useFormik } from 'formik';

const ReservationForm = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
        },
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
            </label>
            <button type="submit">Submit Reservation</button>
        </form>
    );
};

export default ReservationForm;
