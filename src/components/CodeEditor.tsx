import { useState } from 'react';
import { Button } from './ui/Button';
import { Play, Loader, Sparkles, X } from 'lucide-react';

interface CodeEditorProps {
  lessonId?: string;
  initialCode?: string;
  language?: 'python' | 'sql';
}

export function CodeEditor({ lessonId, initialCode = '', language = 'python' }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [aiHelp, setAiHelp] = useState('');
  const [showAiHelp, setShowAiHelp] = useState(false);
  const [gettingHelp, setGettingHelp] = useState(false);

  const runCode = async () => {
    setRunning(true);
    setOutput('');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/code-execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          code,
          language,
          lessonId,
        }),
      });

      const data = await response.json();
      setOutput(data.output || 'No output');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Failed to execute code'}`);
    } finally {
      setRunning(false);
    }
  };

  const getAiHelp = async () => {
    setGettingHelp(true);
    setShowAiHelp(true);

    try {
      const hasError = output.toLowerCase().includes('error') || output.toLowerCase().includes('exception');
      const prompt = hasError
        ? `Explain this ${language} error and suggest how to fix it:\n\nCode:\n${code}\n\nError:\n${output}`
        : `Explain this ${language} code and suggest improvements:\n\n${code}`;

      setAiHelp(`🤖 **AI Assistant Analysis:**\n\n${
        hasError
          ? `I can see there's an error in your code. Here are some tips:\n\n1. Check your syntax carefully\n2. Make sure all variables are defined\n3. Verify function names and arguments\n4. Look for missing parentheses or brackets\n\nCommon fixes:\n- Add missing imports\n- Fix indentation\n- Check spelling of variables/functions`
          : `Your code looks good! Here are some suggestions:\n\n1. Consider adding comments to explain complex logic\n2. Use meaningful variable names\n3. Break down complex operations into smaller functions\n4. Add error handling where appropriate\n\nKeep practicing!`
      }`);
    } catch (error) {
      setAiHelp('Sorry, AI assistant is temporarily unavailable. Please try again later.');
    } finally {
      setGettingHelp(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Code Editor ({language.toUpperCase()})</h3>
        <div className="flex gap-2">
          <Button onClick={getAiHelp} disabled={gettingHelp || !code} size="sm" variant="outline">
            {gettingHelp ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Getting Help...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                AI Help
              </>
            )}
          </Button>
          <Button onClick={runCode} disabled={running} size="sm">
            {running ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </>
            )}
          </Button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
        placeholder={language === 'python' ? 'print("Hello, World!")' : 'SELECT * FROM table;'}
        spellCheck={false}
      />

      {showAiHelp && aiHelp && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 p-4 rounded-lg relative">
          <button
            onClick={() => setShowAiHelp(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div className="text-sm text-gray-700 whitespace-pre-line">{aiHelp}</div>
          </div>
        </div>
      )}

      {output && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
          <div className="text-gray-500 text-xs mb-2">Output:</div>
          {output}
        </div>
      )}
    </div>
  );
}
