import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, GithubIcon } from 'lucide-react';
import { ModeToggle } from './components/mode-toggle';
import { NumberInput } from './components/number-input';
import { numberInputString } from './components/number-input-string';
import { ThemeProvider } from './components/theme-provider';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { toast, Toaster } from 'sonner';

export default function App() {
  function handleCopyButtonClick() {
    navigator.clipboard.writeText(numberInputString);
    toast('Code copied to clipboard');
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <div className="max-w-[600px] flex items-start justify-center flex-col mx-auto pt-36 gap-6">
        <div className="flex flex-row gap-4">
          <ModeToggle />
          <Button
            variant={'outline'}
            size={'icon'}
            onClick={() =>
              window.open('https://github.com/costidotdev/shadcn-number-input')
            }
          >
            <GithubIcon size={19} />
          </Button>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Number Input Component with Shadcn UI
        </h1>
        <p className="text-muted-foreground leading-7">
          <p>
            This is a demo of a custom number input component built with{' '}
            <a
              href="https://ui.shadcn.com"
              className="text-blue-500 hover:text-blue-700"
            >
              Shadcn UI{' '}
            </a>
            and{' '}
            <a
              href="https://s-yadav.github.io/react-number-format/docs/intro/"
              className="text-blue-500 hover:text-blue-700"
            >
              react-number-format
            </a>
            . Feel free to play around with it and customize it to your needs.
          </p>
        </p>
        <Tabs defaultValue="examples" className="w-full">
          <TabsList>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="examples">
            <div className="flex flex-col gap-4 rounded-md border border-border w-full p-6">
              <Label htmlFor="minMaxInput">With min = 10 and max = 100</Label>
              <NumberInput
                id="minMaxInput"
                placeholder="Enter number"
                min={10}
                max={100}
                defaultValue={10}
              />

              <Label htmlFor="suffixPreffixInput">
                With suffix and preffix
              </Label>

              <NumberInput
                id="suffixPreffixInput"
                placeholder="Amount"
                prefix="$"
                suffix=" USD"
                defaultValue={100}
              />

              <Label htmlFor="decimalInput">
                With decimals (decimalScale = 2)
              </Label>

              <NumberInput
                id="decimalInput"
                placeholder="Enter decimal number"
                decimalScale={2}
              />

              <Label htmlFor="stepper"> With stepper = 5</Label>

              <NumberInput id="stepper" placeholder="Step by 5" stepper={5} />

              <Label htmlFor="formatting">
                With formatting for thousand separator
              </Label>

              <NumberInput
                id="formatting"
                placeholder="Formatting"
                thousandSeparator={','}
              />
            </div>
          </TabsContent>
          <TabsContent value="code">
            <div className="flex flex-col">
              <div className="relative">
                <pre className="overflow-auto w-full max-h-[300px]">
                  <code>{numberInputString}</code>
                </pre>
                <Button
                  className="absolute top-0 right-0 m-4"
                  onClick={handleCopyButtonClick}
                >
                  <Copy size={15} />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  );
}
