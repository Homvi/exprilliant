import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import CustomGuestLayout from "../Layouts/CustomGuestLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestNewExpression() {
    const { data, setData, post, processing, errors, reset } = useForm({
        expression: "",
        right_answer: "",
        false_answer_one: "",
        false_answer_two: "",
        expression_language: "en",
        answer_language: "en",
    });

    useEffect(() => {
        return () => {
            reset(
                "expression",
                "right_answer",
                "false_answer_one",
                "false_answer_two",
                "expression_language",
                "answer_language"
            );
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("expressions.store"), {
            onSuccess: () => {
                toast.success("Expression submitted successfully!");
                reset();
            },
            onError: () => {
                toast.error("There was an error submitting the expression.");
            },
        });
    };

    return (
        <CustomGuestLayout>
            <GuestLayout>
                <Head title="Request New Expression" />

                <ToastContainer />

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="expression" value="Expression" />

                        <TextInput
                            id="expression"
                            name="expression"
                            value={data.expression}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("expression", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.expression}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="right_answer"
                            value="Right Answer"
                        />

                        <TextInput
                            id="right_answer"
                            name="right_answer"
                            value={data.right_answer}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("right_answer", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.right_answer}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="false_answer_one"
                            value="False Answer One"
                        />

                        <TextInput
                            id="false_answer_one"
                            name="false_answer_one"
                            value={data.false_answer_one}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("false_answer_one", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.false_answer_one}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="false_answer_two"
                            value="False Answer Two"
                        />

                        <TextInput
                            id="false_answer_two"
                            name="false_answer_two"
                            value={data.false_answer_two}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("false_answer_two", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.false_answer_two}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="expression_language"
                            value="Expression Language"
                        />

                        <select
                            id="expression_language"
                            name="expression_language"
                            value={data.expression_language}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("expression_language", e.target.value)
                            }
                            required
                        >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="hu">Hungarian</option>
                        </select>

                        <InputError
                            message={errors.expression_language}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="answer_language"
                            value="Answer Language"
                        />

                        <select
                            id="answer_language"
                            name="answer_language"
                            value={data.answer_language}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("answer_language", e.target.value)
                            }
                            required
                        >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="hu">Hungarian</option>
                        </select>

                        <InputError
                            message={errors.answer_language}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        </CustomGuestLayout>
    );
}
