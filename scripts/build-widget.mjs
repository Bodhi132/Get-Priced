import * as esbuild from 'esbuild';

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['src/widget/index.tsx'],
      bundle: true,
      minify: true,
      sourcemap: false,
      outfile: 'public/widget.js',
      format: 'iife', // Immediately Invoked Function Expression for global scope isolation
      platform: 'browser',
      target: ['es2020'],
      define: {
        'process.env.NODE_ENV': '"production"',
      },
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
      },
    });
    console.log('Widget build successful: public/widget.js');
  } catch (e) {
    console.error('Widget build failed:', e);
    process.exit(1);
  }
}

build();
