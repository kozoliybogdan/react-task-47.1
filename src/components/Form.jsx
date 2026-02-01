import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Input from "./Input"

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Мінімум 2 символи")
        .required("Ім'я обов'язкове"),
    email: Yup.string()
        .email("Некоректний email")
        .required("Email обов'язковий"),
    password: Yup.string()
        .min(6, "Мінімум 6 символів")
        .required("Пароль обов'язковий"),
})

export default function Form() {
    const [submitted, setSubmitted] = useState(null)

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values, helpers) => {
            setSubmitted(values)

            helpers.setSubmitting(true)
            await new Promise((r) => setTimeout(r, 600))
            helpers.setSubmitting(false)

            helpers.resetForm()
        },
    })

    return (
        <div className="card">
            <h2>Formik + Yup форма</h2>

            <form onSubmit={formik.handleSubmit} noValidate>
                <Input
                    label="Ім'я"
                    name="name"
                    placeholder="Напр. Богдан"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.name}
                    touched={formik.touched.name}
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                />

                <Input
                    label="Пароль"
                    name="password"
                    type="password"
                    placeholder="мінімум 6 символів"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                />

                <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "Відправляю..." : "Відправити"}
                </button>
            </form>

            {submitted && (
                <div className="result">
                    <h3>Остання відправка</h3>
                    <pre>{JSON.stringify(submitted, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}