import { usePage } from '@inertiajs/react';
import { InertiaSharedProps } from '../types/jetstream/jetstream-inertia.intf';

export default function useTypedPageHookFn<T = {}>() {
  return usePage<InertiaSharedProps<T>>();
}
