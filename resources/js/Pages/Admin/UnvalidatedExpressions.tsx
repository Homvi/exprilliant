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

  const applyFilters = (nextExp?: string, nextAns?: string) => {
    const query: Record<string, string> = {};
    if (nextExp) query.exp = nextExp;
    if (nextAns) query.ans = nextAns;
    router.get(route('admin.expressions.index'), query, { preserveScroll: true, preserveState: true, replace: true });
  };

  const clearFilters = () => {
    setExp(undefined);
    setAns(undefined);
    applyFilters();
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

    const query: Record<string, string> = {};
    if (exp) query.exp = exp;
    if (ans) query.ans = ans;

    post(route('admin.expressions.validate', { expression: selectedExpression, ...query }), {
      preserveScroll: true,
      onSuccess: () => closeModal()
    });
  };

  const deleteExpression = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const query: Record<string, string> = {};
    if (exp) query.exp = exp;
    if (ans) query.ans = ans;

    destroy(route('admin.expressions.destroy', { expression: selectedExpression, ...query }), {
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
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6">
        <Head title="Unvalidated Expressions" />

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Unvalidated Expressions</h1>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-neutral-600">Expression language:</span>
            <div className="flex gap-2">
              {['en', 'es', 'hu'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    const next = exp === lang ? undefined : lang;
                    setExp(next);
                    applyFilters(next, ans);
                  }}
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
                  onClick={() => {
                    const next = ans === lang ? undefined : lang;
                    setAns(next);
                    applyFilters(exp, next);
                  }}
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
                    applyFilters(e, a);
                  }}
                  className="px-3 py-1 rounded-full text-sm border bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500"
                >
                  {pair}
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex gap-2">
            <button onClick={clearFilters} className="px-3 py-1 rounded-md bg-white border border-neutral-300 text-neutral-800 text-sm">
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {expressions.length === 0 && (
            <div className="col-span-full">
              <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-600">
                No unvalidated expressions found.
              </div>
            </div>
          )}

          {expressions.map((expression) => (
            <div
              key={expression.id}
              className="group rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-neutral-300 bg-neutral-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-neutral-700">
                      {expression.expression_language}-{expression.answer_language}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold leading-snug text-neutral-900 break-words whitespace-normal">
                    {expression.expression}
                  </h2>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => handleValidate(expression.id)}
                    disabled={processing}
                    className="inline-flex items-center rounded-md border border-green-600 px-2.5 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50 disabled:opacity-50"
                    aria-label="Validate"
                  >
                    Validate
                  </button>
                  <button
                    onClick={() => handleDelete(expression.id)}
                    disabled={processing}
                    className="inline-flex items-center rounded-md border border-red-600 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                    aria-label="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-green-700">Right answer</div>
                  <div className="text-sm text-neutral-900">{expression.right_answer}</div>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-red-700">False answer 1</div>
                  <div className="text-sm text-neutral-900">{expression.false_answer_one}</div>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-red-700">False answer 2</div>
                  <div className="text-sm text-neutral-900">{expression.false_answer_two}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-neutral-600">
                <div className="truncate">
                  <span className="font-medium text-neutral-700">Submitted by:</span>{' '}
                  <span className="truncate">
                    {expression.user ? expression.user.name : 'Unknown'}
                    {expression.user?.email ? ` · ${expression.user.email}` : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
