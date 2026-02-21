'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useCreateWorkspace } from '@/queries/use-workspaces';
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

const workspaceNameSchema = z.object({
  name: z
    .string()
    .min(1, 'Workspace name is required.')
    .max(100, 'Workspace name must be less than 100 characters.'),
});

const CreateWorkspaceForm = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const createWorkspaceMutation = useCreateWorkspace();

  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onSubmit: workspaceNameSchema,
      onBlur: workspaceNameSchema,
      onChange: workspaceNameSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await createWorkspaceMutation.mutateAsync(value.name);

        if ('error' in result) {
          console.error(result.error);
          return;
        }

        router.push(`/w/${result.id}`);
        form.reset();
        setOpen(false);
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button size='default' className='gap-2'>
          <PlusIcon className='size-4' />
          New Workspace
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
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Create a new workspace to organize your work and collaborate with
              your team.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name='name'
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Workspace Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='My Workspace'
                      autoComplete='off'
                    />
                    <FieldDescription>
                      Choose a descriptive name for your workspace. You can
                      change it later.
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
              {form.state.isSubmitting ? 'Creating...' : 'Create Workspace'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceForm;
