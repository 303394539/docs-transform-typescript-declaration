/**
 * Clears all cached templates in this writer.
 */
export declare function clearCache(): void;

export declare type COMMENT = "!";

/**
 * Represents a rendering context by wrapping a view object and maintaining a reference to the parent context.
 */
export declare class Context {
    view: any;
    parent: Context | undefined;

    /**
     * Initializes a new instance of the {@link Context `Context`} class.
     */
    constructor(view: any, parentContext?: Context);

    /**
     * Creates a new context using the given view with this context as the parent.
     *
     * @param view
     * The view to create the new context with.
     */
    push(view: any): Context;

    /**
     * Returns the value of the given name in this context, traversing up the context hierarchy if the value is absent in this context's view.
     *
     * @param name
     * The name to look up.
     */
    lookup(name: string): any;
}

export declare type EQUAL = "=";

/**
 * HTML escaping by default, can be overridden by setting Mustache.escape explicitly or providing the `options`
 * argument with an `escape` function when invoking {@link render `Mustache.render()`}.
 *
 * Escaping can be avoided when needed by using `{{{ value }}}` or `{{& value }}` in templates.
 *
 * @param value
 * The value to escape into a string.
 */
declare let escape_2: EscapeFunction;
export { escape_2 as escape }

export declare type ESCAPED_VALUE = "name";

/**
 * Function responsible for escaping values from the view into the rendered output when templates
 * has `{{ value }}` in them.
 */
export declare type EscapeFunction = (value: any) => string;

export declare type INVERTED = "^";

/**
 * The name of the module.
 */
declare const name_2: string;
export { name_2 as name }

/**
 * An array of two strings, representing the opening and closing tags respectively, to be used in the templates being rendered.
 */
export declare type OpeningAndClosingTags = [string, string];

/**
 * Parses and caches the given template in the default writer and returns the array of tokens it contains.
 *
 * Doing this ahead of time avoids the need to parse templates on the fly as they are rendered.
 *
 * @param template
 * The template to parse.
 *
 * @param tags
 * The tags to use.
 */
export declare function parse(template: string, tags?: OpeningAndClosingTags): TemplateSpans;

export declare type PARTIAL = ">";

export declare type PartialLookupFn = (partialName: string) => string | undefined;

/**
 * Whenever partials are provided, it can either be an object that contains the names and templates of partials that are used in templates
 *
 * -- or --
 *
 * A function that is used to load partial template on the fly that takes a single argument: the name of the partial.
 */
export declare type PartialsOrLookupFn = Record<string, string> | PartialLookupFn;

export declare type RAW_VALUE = "text";

/**
 * Renders the {@link template `template`} with the given {@link view `view`} and {@link partials `partials`} using the default writer.
 *
 * @param template
 * The template to render.
 *
 * @param view
 * The view to render the template with.
 *
 * @param partials
 * Either an object that contains the names and templates of partials that are used in a template
 *
 * -- or --
 *
 * A function that is used to load partial template on the fly that takes a single argument: the name of the partial.
 *
 * @param tagsOrOptions
 * The delimiter tags to use or options overriding global defaults.
 */
export declare function render(
template: string,
view: any | Context,
partials?: PartialsOrLookupFn,
tagsOrOptions?: OpeningAndClosingTags | RenderOptions,
): string;

export declare interface RenderOptions {
    escape?: EscapeFunction | undefined;
    tags?: OpeningAndClosingTags | undefined;
}

/**
 * A simple string scanner that is used by the template parser to find tokens in template strings.
 */
export declare class Scanner {
    string: string;
    tail: string;
    pos: number;

    /**
     * Initializes a new instance of the {@link Scanner `Scanner`} class.
     */
    constructor(string: string);

    /**
     * Returns `true` if the tail is empty (end of string).
     */
    eos(): boolean;

    /**
     * Tries to match the given regular expression at the current position.
     *
     * @param re
     * The regex-pattern to match.
     *
     * @returns
     * The matched text if it can match, the empty string otherwise.
     */
    scan(re: RegExp): string;

    /**
     * Skips all text until the given regular expression can be matched.
     *
     * @param re
     * The regex-pattern to match.
     *
     * @returns
     * Returns the skipped string, which is the entire tail if no match can be made.
     */
    scanUntil(re: RegExp): string;
}

export declare type SECTION = "#";

/**
 * The default opening and closing tags used while parsing the templates.
 *
 * Different default tags can be overridden by setting this field. They will have effect on all subsequent
 * calls to {@link render `.render()`} or {@link parse `.parse()`}, unless custom tags are given as arguments to those functions.
 *
 * Default value is `[ "{{", "}}" ]`.
 */
export declare let tags: OpeningAndClosingTags;

export declare interface TemplateCache {
    set(cacheKey: string, value: string): void;
    get(cacheKey: string): string | undefined;
    clear(): void;
}

/**
 * Customise the template caching behaviour by either:
 *
 * disable it completely by setting it to `undefined`
 *
 * -- or --
 *
 * provide a custom cache strategy that satisfies the {@link TemplateCache `TemplateCache`} interface
 */
export declare let templateCache: TemplateCache | undefined;

export declare type TemplateSpans = Array<
| [TemplateSpanType, string, number, number]
| [TemplateSpanType, string, number, number, TemplateSpans, number]
| [TemplateSpanType, string, number, number, string, number, boolean]
>;

export declare type TemplateSpanType =
| RAW_VALUE
| ESCAPED_VALUE
| SECTION
| UNESCAPED_VALUE
| INVERTED
| COMMENT
| PARTIAL
| EQUAL;

export declare type UNESCAPED_VALUE = "&";

/**
 * The version of the module.
 */
export declare const version: string;

/**
 * A Writer knows how to take a stream of tokens and render them to a {@link String `string`}, given a context.
 *
 * It also maintains a cache of templates to avoid the need to parse the same template twice.
 */
export declare class Writer {
    /**
     * Initializes a new instance of the {@link Writer `Writer`} class.
     */
    constructor();

    /**
     * Clears all cached templates in this writer.
     */
    clearCache(): void;

    /**
     * Parses and caches the given {@link template `template`} and returns the array of tokens that is generated from the parse.
     *
     * @param template
     * The template to parse.
     *
     * @param tags
     * The tags to use.
     */
    parse(template: string, tags?: OpeningAndClosingTags): any;

    /**
     * High-level method that is used to render the given {@link template `template`} with the given {@link view `view`}.
     *
     * @param template
     * The template to render.
     *
     * @param view
     * The view to render the template with.
     *
     * @param partials
     * Either an object that contains the names and templates of partials that are used in a template
     *
     * -- or --
     *
     * A function that is used to load partial template on the fly that takes a single argument: the name of the partial.
     *
     * @param config
     * The options for the rendering process.
     */
    render(
    template: string,
    view: any | Context,
    partials?: PartialsOrLookupFn,
    config?: OpeningAndClosingTags | RenderOptions,
    ): string;

    /**
     * Low-level method that renders the given array of {@link tokens `tokens`} using the given {@link context `context`} and {@link partials `partials`}.
     *
     * @param tokens
     * The tokens to render.
     *
     * @param context
     * The context to use for rendering the tokens.
     *
     * @param partials
     * The partials to use for rendering the tokens.
     *
     * @param originalTemplate
     * An object used to extract the portion of the original template that was contained in a higher-order section.
     *
     * If the template doesn't use higher-order sections, this argument may be omitted.
     *
     * @param config
     * The options for the rendering process.
     */
    renderTokens(
    tokens: string[][],
    context: Context,
    partials?: PartialsOrLookupFn,
    originalTemplate?: string,
    config?: RenderOptions,
    ): string;

    /**
     * Renders a section block.
     *
     * @param token
     * The token to render.
     *
     * @param context
     * The context to use for rendering the token.
     *
     * @param partials
     * The partials to use for rendering the token.
     *
     * @param originalTemplate
     * An object used to extract the portion of the original template that was contained in a higher-order section.
     *
     * @param config
     * The options for the rendering process.
     */
    renderSection(
    token: string[],
    context: Context,
    partials?: PartialsOrLookupFn,
    originalTemplate?: string,
    config?: RenderOptions,
    ): string;

    /**
     * Renders an inverted section block.
     *
     * @param token
     * The token to render.
     *
     * @param context
     * The context to use for rendering the token.
     *
     * @param partials
     * The partials to use for rendering the token.
     *
     * @param originalTemplate
     * An object used to extract the portion of the original template that was contained in a higher-order section.
     *
     * @param config
     * The options for the rendering process.
     */
    renderInverted(
    token: string[],
    context: Context,
    partials?: PartialsOrLookupFn,
    originalTemplate?: string,
    config?: RenderOptions,
    ): string;

    /**
     * Adds indentation to each line of the given partial.
     *
     * @param partial
     * The partial to indent.
     *
     * @param indentation
     * String containing a combination of spaces and tabs to use as indentation.
     *
     * @param lineHasNonSpace
     * Whether to indent lines that are empty.
     */
    indentPartial(partial: string, indentation: string, lineHasNonSpace: boolean): string;

    /**
     * Renders a partial.
     *
     * @param token
     * The token to render.
     *
     * @param context
     * The context to use for rendering the token.
     *
     * @param partials
     * The partials to use for rendering the token.
     *
     * @param config
     * The options for the rendering process.
     */
    renderPartial(
    token: string[],
    context: Context,
    partials?: PartialsOrLookupFn,
    config?: OpeningAndClosingTags | RenderOptions,
    ): string;

    /**
     * Renders an unescaped value.
     *
     * @param token
     * The token to render.
     *
     * @param context
     * The context to use for rendering the token.
     */
    unescapedValue(token: string[], context: Context): string;

    /**
     * Renders an escaped value.
     *
     * @param token
     * The token to render.
     *
     * @param context
     * The context to use for rendering the token.
     *
     * @param config
     * The options for the rendering process.
     */
    escapedValue(
    token: string[],
    context: Context,
    config?: RenderOptions,
    ): string;

    /**
     * Renders a raw token.
     *
     * @param token
     * The token to render.
     */
    rawValue(token: string[]): string;
}

export { }
