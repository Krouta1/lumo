'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useCreatePage } from '@/queries/use-pages';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../ui/field';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useState } from 'react';

const pageSchema = z.object({
  title: z
    .string()
    .min(1, 'Page title is required.')
    .max(200, 'Page title must be less than 200 characters.'),
  icon: z.string(),
});

type Props = {
  parentPageId?: string | null;
};

const CreatePageForm = ({ parentPageId }: Props = {}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const workspaceId = Number(params.workspaceId);
  const createPageMutation = useCreatePage();

  const form = useForm({
    defaultValues: { title: '', icon: '' },
    validators: {
      onSubmit: pageSchema,
      onBlur: pageSchema,
      onChange: pageSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await createPageMutation.mutateAsync({
          title: value.title,
          icon: value.icon || undefined,
          workspaceId,
          parentPageId: parentPageId ?? undefined,
        });

        if ('error' in result) {
          console.error(result.error);
          return;
        }

        router.push(`/w/${workspaceId}/p/${result.id}`);
        form.reset();
        setOpen(false);
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) form.reset();
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button size='default' className='gap-2'>
          <PlusIcon className='size-4' />
          New Page
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className='space-y-6'
        >
          <DialogHeader>
            <DialogTitle>Create Page</DialogTitle>
            <DialogDescription>
              Create a new page in this workspace.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <form.Field
              name='title'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Page Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Untitled Page'
                      autoComplete='off'
                    />
                    <FieldDescription>
                      Give your page a descriptive title.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name='icon'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Page Icon</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='AArrowDown'
                      autoComplete='off'
                    />
                    <FieldDescription>
                      Give your page an optional icon name from the Lucide icon
                      set. Example icons: home, file, folder, settings, user.
                      Use component name.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' type='button'>
                Close
              </Button>
            </DialogClose>
            <Button type='submit' disabled={form.state.isSubmitting}>
              {form.state.isSubmitting ? 'Creating...' : 'Create Page'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePageForm;
