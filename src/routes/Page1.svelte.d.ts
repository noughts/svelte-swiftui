import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type Page1Props = typeof __propDef.props;
export type Page1Events = typeof __propDef.events;
export type Page1Slots = typeof __propDef.slots;
export default class Page1 extends SvelteComponent<Page1Props, Page1Events, Page1Slots> {
}
export {};
