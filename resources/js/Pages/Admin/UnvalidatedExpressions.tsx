import { SetStateAction, useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import CustomGuestLayout from '@/Layouts/CustomGuestLayout';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { Expression } from '@/Types/Expressions';

interface UnvalidatedExpressionsPropType {
  expressions: Expression[];
  filters?: { exp?: string | null; ans?: string | null };
  languages?: string[];
  pairs?: string[];
}

const UnvalidatedExpressions = ({ expressions, filters, languages = [], pairs = [] }: UnvalidatedExpressionsPropType) => {
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);
  const [confirmingValidation, setConfirmingValidation] = useState(false);
  const [selectedExpression, setSelectedExpression] = useState<number | undefined>(undefined);
  const [exp, setExp] = useState<string | undefined>(filters?.exp ?? undefined);
  const [ans, setAns] = useState<string | undefined>(filters?.ans ?? undefined);

  const { delete: destroy, post, processing, reset } = useForm();

  const clearFilters = () => {
    setExp(undefined);
    setAns(undefined);
    router.get(route('admin.expressions.index'), {}, { preserveScroll: true, preserveState: true });
  };

  const applyFilters = () => {
    const query: Record<string, string> = {};
    if (exp) query.exp = exp;
    if (ans) query.ans = ans;
    router.get(route('admin.expressions.index'), query, { preserveScroll: true, preserveState: true });
  };

  const handleValidate = (id: number) => {
    setSelectedExpression(id);
    setConfirmingValidation(true);
  };

  const handleDelete = (id: number) => {
    setSelectedExpression(id);
    setConfirmingDeletion(true);
  };

  const validateExpression = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    post(route('admin.expressions.validate', selectedExpression), {
      preserveScroll: true,
      onSuccess: () => closeModal()
    });
  };

  const deleteExpression = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    destroy(route('admin.expressions.destroy', selectedExpression), {
      preserveScroll: true,
      onSuccess: () => closeModal()
    });
  };

  const closeModal = () => {
    setConfirmingDeletion(false);
    setConfirmingValidation(false);
    setSelectedExpression(undefined);
    reset();
  };

  return (
    <CustomGuestLayout>
      <div className="p-3 bg-[#eff0f7] text-[#171923] min-h-screen">
        <Head title="Unvalidated Expressions" />

        <h1 className="text-2xl font-bold mb-4">Unvalidated Expressions</h1>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-neutral-600">Expression language:</span>
            <div className="flex gap-2">
              {['en', 'es', 'hu'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setExp(exp === lang ? undefined : lang)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    exp === lang ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-neutral-600">Answer language:</span>
            <div className="flex gap-2">
              {['en', 'es', 'hu'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setAns(ans === lang ? undefined : lang)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    ans === lang ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Quick pairs */}
          {pairs?.length ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-neutral-600">Pairs:</span>
              {pairs.map((pair) => (
                <button
                  key={pair}
                  onClick={() => {
                    const [e, a] = pair.split('-');
                    setExp(e);
                    setAns(a);
                  }}
                  className="px-3 py-1 rounded-full text-sm border bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                >
                  {pair}
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex gap-2">
            <button onClick={applyFilters} className="px-3 py-1 rounded-md bg-neutral-900 text-white text-sm">
              Apply
            </button>
            <button onClick={clearFilters} className="px-3 py-1 rounded-md bg-white border border-neutral-300 text-neutral-800 text-sm">
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expressions.length === 0 && <p className="text-neutral-600">No unvalidated expressions found.</p>}
          {expressions.map((expression) => (
            <div key={expression.id} className={`border-t-4 rounded-lg shadow-lg p-6 bg-white text-neutral-800`}>
              <div className="flex justify-between items-center">
                <div>
                  <div>
                    {expression.expression_language}-{expression.answer_language}
                  </div>
                  <h2 className="text-2xl font-semibold">{expression.expression}</h2>
                </div>
              </div>
              <div className="mt-4">
                <p className="bg-green-200 mb-3 p-1">
                  <strong>Right Answer:</strong> <br />
                  {expression.right_answer}
                </p>
                <p className="bg-red-200 mb-3 p-1">
                  <strong>False Answer 1:</strong> <br />
                  {expression.false_answer_one}
                </p>
                <p className="bg-red-200 mb-3 p-1">
                  <strong>False Answer 2:</strong> <br />
                  {expression.false_answer_two}
                </p>
                <p>
                  Expression Language: <strong> {expression.expression_language}</strong>
                </p>
                <p>
                  Answer Language: <strong>{expression.answer_language}</strong>
                </p>
                <p>
                  <strong>Submitted by:</strong> {expression.user ? expression.user.name : 'Unknown'}
                </p>
                <p>{expression.user ? expression.user.email : 'Unknown'}</p>
              </div>
              <div className="mt-5">
                <button
                  className="bg-green-600 text-white py-1 px-4 rounded mr-2"
                  onClick={() => handleValidate(expression.id)}
                  disabled={processing}
                >
                  Validate
                </button>
                <button
                  className="bg-red-600 text-white py-1 px-4 rounded"
                  onClick={() => handleDelete(expression.id)}
                  disabled={processing}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal show={confirmingDeletion} onClose={closeModal}>
          <form onSubmit={deleteExpression} className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Are you sure you want to delete this expression?</h2>
            <p className="mt-1 text-sm text-gray-600">Once this expression is deleted, it cannot be recovered.</p>
            <div className="mt-6 flex justify-end">
              <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
              <DangerButton className="ms-3" disabled={processing}>
                Delete
              </DangerButton>
            </div>
          </form>
        </Modal>

        <Modal show={confirmingValidation} onClose={closeModal}>
          <form onSubmit={validateExpression} className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Are you sure you want to validate this expression?</h2>
            <p className="mt-1 text-sm text-gray-600">
              Once this expression is validated, it will be available for use.
            </p>
            <div className="mt-6 flex justify-end">
              <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
              <PrimaryButton className="ms-3" disabled={processing}>
                Validate
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      </div>
    </CustomGuestLayout>
  );
};

export default UnvalidatedExpressions;
