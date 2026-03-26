'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { ChevronDown } from 'lucide-react'

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
  className?: string
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Resetear foco al cerrar
  useEffect(() => {
    if (!open) setFocusedIndex(-1)
  }, [open])

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!open) {
          setOpen(true)
        } else if (focusedIndex >= 0) {
          onChange(options[focusedIndex])
          setOpen(false)
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) {
          setOpen(true)
        } else {
          setFocusedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0,
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1,
        )
        break
      case 'Tab':
        setOpen(false)
        break
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`flex items-center justify-between w-full text-left ${className} ${
          value ? 'text-ink' : 'text-ink/40'
        }`}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 text-[--text-secondary] shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-2 w-full bg-bg border border-warm/50 rounded-2xl shadow-md overflow-hidden py-1.5"
        >
          {options.map((opt, index) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              onMouseEnter={() => setFocusedIndex(index)}
              className={`px-4 py-2.5 font-sans text-sm cursor-pointer transition-colors duration-150 rounded-xl mx-1.5 ${
                value === opt
                  ? 'bg-blue-soft/30 text-ink font-medium'
                  : focusedIndex === index
                    ? 'bg-warm/40 text-ink'
                    : 'text-ink hover:bg-warm/40'
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
