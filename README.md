# Payload Gutenberg

A demonstration project that implements a Gutenberg-style visual layout editor within Payload CMS.

## Overview

Payload Gutenberg combines the powerful content management capabilities of Payload CMS with an intuitive block-based editor inspired by WordPress Gutenberg. This project showcases how to build a flexible, visual editing experience that empowers content creators while maintaining developer control.

## Features

- **Visual Block Editor**: Drag-and-drop interface for building complex page layouts
- **Custom Block Types**: Create and configure specialized content blocks
- **Responsive Preview**: Test how layouts appear across different device sizes
- **Content Reusability**: Save and reuse block patterns across your site
- **TypeScript Integration**: Fully typed for improved developer experience
- **Next.js Frontend**: Seamless integration with Next.js 15 for frontend rendering

## Tech Stack

- [Payload CMS](https://payloadcms.com/) - Headless CMS with a powerful admin panel
- [Next.js 15](https://nextjs.org/) - React framework for frontend rendering
- [PostgreSQL](https://www.postgresql.org/) - Database for content storage
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v18.20.2 or >=20.9.0)
- pnpm (v9 or v10)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/forrestdevs/payload-gutenberg.git
   cd payload-gutenberg
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URI=postgres://username:password@localhost:5432/database_name
   PAYLOAD_SECRET=your_secret_key
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   CRON_SECRET=your_cron_secret
   PREVIEW_SECRET=your_preview_secret
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Access the admin panel at `http://localhost:3000/admin`

## Project Structure

- `/src/payload/collections` - Payload collections configuration
- `/src/payload/blocks` - Custom Gutenberg block definitions
- `/src/components` - React components for the frontend
- `/src/app` - Next.js app router pages and layouts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- WordPress Gutenberg for inspiration
- Payload CMS team for the excellent headless CMS
