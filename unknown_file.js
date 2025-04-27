<changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency<changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency !== 'Nunca' && (
          
            
              A cada
            
            
              
                
                  id="interval"
                  type="number"
                  min="1"
                  value={recurrenceInterval}
                  onChange={(e) =>
                    set<changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency !== 'Nunca' && (
          
            
              A cada
            
            
              
                
                  id="interval"
                  type="number"
                  min="1"
                  value={recurrenceInterval}
                  onChange={(e) =>
                    setRecurrenceInterval(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-1/2"
                />
                {getFrequencyUnit(recurrenceFrequency)}
              
            
            <changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency !== 'Nunca' && (
          
            
              A cada
            
            
              
                
                  id="interval"
                  type="number"
                  min="1"
                  value={recurrenceInterval}
                  onChange={(e) =>
                    setRecurrenceInterval(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-1/2"
                />
                {getFrequencyUnit(recurrenceFrequency)}
              
            
            
            {recurrenceFrequency === 'Semanal' && (
              
                Repete-se
              
              
                  type="multiple"
                  variant="outline"
                  value={recurrenceDays}
                  onValueChange={setRecurrenceDays}
                  className="<changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency !== 'Nunca' && (
          
            
              A cada
            
            
              
                
                  id="interval"
                  type="number"
                  min="1"
                  value={recurrenceInterval}
                  onChange={(e) =>
                    setRecurrenceInterval(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-1/2"
                />
                {getFrequencyUnit(recurrenceFrequency)}
              
            
            
            {recurrenceFrequency === 'Semanal' && (
              
                Repete-se
              
              
                  type="multiple"
                  variant="outline"
                  value={recurrenceDays}
                  onValueChange={setRecurrenceDays}
                  className="col-span-3 justify-start flex-wrap"
                
                  {weekDays.map((day) => (
                    
                      key={day.id}
                      value={day.id}
                      aria-label={`Repetir em ${day.label}`}
                      className="<changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency !== 'Nunca' && (
          
            
              A cada
            
            
              
                
                  id="interval"
                  type="number"
                  min="1"
                  value={recurrenceInterval}
                  onChange={(e) =>
                    setRecurrenceInterval(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-1/2"
                />
                {getFrequencyUnit(recurrenceFrequency)}
              
            
            
            {recurrenceFrequency === 'Semanal' && (
              
                Repete-se
              
              
                  type="multiple"
                  variant="outline"
                  value={recurrenceDays}
                  onValueChange={setRecurrenceDays}
                  className="col-span-3 justify-start flex-wrap"
                
                  {weekDays.map((day) => (
                    
                      key={day.id}
                      value={day.id}
                      aria-label={`Repetir em ${day.label}`}
                      className="px-2 py-1 h-auto text-xs"
                    >
                      {day.label}
                    
                  ))}
                
              
            )}
            
          
        )}
      
      
        
          Cancelar
        
        <changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency !== 'Nunca' && (
          
            
              A cada
            
            
              
                
                  id="interval"
                  type="number"
                  min="1"
                  value={recurrenceInterval}
                  onChange={(e) =>
                    setRecurrenceInterval(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-1/2"
                />
                {getFrequencyUnit(recurrenceFrequency)}
              
            
            
            {recurrenceFrequency === 'Semanal' && (
              
                Repete-se
              
              
                  type="multiple"
                  variant="outline"
                  value={recurrenceDays}
                  onValueChange={setRecurrenceDays}
                  className="col-span-3 justify-start flex-wrap"
                
                  {weekDays.map((day) => (
                    
                      key={day.id}
                      value={day.id}
                      aria-label={`Repetir em ${day.label}`}
                      className="px-2 py-1 h-auto text-xs"
                    >
                      {day.label}
                    
                  ))}
                
              
            )}
            
          
        )}
      
      
        
          Cancelar
        
        
          Criar tarefa
        
      
    
  
      title="A fazer"
      tasks={todoTasks}
      taskCount={todoTasks.length}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDrag<changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency !== 'Nunca' && (
          
            
              A cada
            
            
              
                
                  id="interval"
                  type="number"
                  min="1"
                  value={recurrenceInterval}
                  onChange={(e) =>
                    setRecurrenceInterval(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-1/2"
                />
                {getFrequencyUnit(recurrenceFrequency)}
              
            
            
            {recurrenceFrequency === 'Semanal' && (
              
                Repete-se
              
              
                  type="multiple"
                  variant="outline"
                  value={recurrenceDays}
                  onValueChange={setRecurrenceDays}
                  className="col-span-3 justify-start flex-wrap"
                
                  {weekDays.map((day) => (
                    
                      key={day.id}
                      value={day.id}
                      aria-label={`Repetir em ${day.label}`}
                      className="px-2 py-1 h-auto text-xs"
                    >
                      {day.label}
                    
                  ))}
                
              
            )}
            
          
        )}
      
      
        
          Cancelar
        
        
          Criar tarefa
        
      
    
  
      title="A fazer"
      tasks={todoTasks}
      taskCount={todoTasks.length}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    />
    
      title="Em progresso"
      tasks={inProgressTasks}
      taskCount={inProgressTasks.length}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={<changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency !== 'Nunca' && (
          
            
              A cada
            
            
              
                
                  id="interval"
                  type="number"
                  min="1"
                  value={recurrenceInterval}
                  onChange={(e) =>
                    setRecurrenceInterval(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-1/2"
                />
                {getFrequencyUnit(recurrenceFrequency)}
              
            
            
            {recurrenceFrequency === 'Semanal' && (
              
                Repete-se
              
              
                  type="multiple"
                  variant="outline"
                  value={recurrenceDays}
                  onValueChange={setRecurrenceDays}
                  className="col-span-3 justify-start flex-wrap"
                
                  {weekDays.map((day) => (
                    
                      key={day.id}
                      value={day.id}
                      aria-label={`Repetir em ${day.label}`}
                      className="px-2 py-1 h-auto text-xs"
                    >
                      {day.label}
                    
                  ))}
                
              
            )}
            
          
        )}
      
      
        
          Cancelar
        
        
          Criar tarefa
        
      
    
  
      title="A fazer"
      tasks={todoTasks}
      taskCount={todoTasks.length}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    />
    
      title="Em progresso"
      tasks={inProgressTasks}
      taskCount={inProgressTasks.length}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    />
    
      title="Concluído"
      tasks={completedTasks}
      taskCount={completedTasks.length}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}<changes>
  <change>
    <file>unknown_file.js</file>
    <description>React component for task management.</description>
    <content><![CDATA[<SelectTrigger id="priority" className="
            </SelectTrigger>
            
              {frequencyOptions.map((option) => (
                
                  {option.label}
                
              ))}
            
          
        
        {recurrenceFrequency !== 'Nunca' && (
          
            
              A cada
            
            
              
                
                  id="interval"
                  type="number"
                  min="1"
                  value={recurrenceInterval}
                  onChange={(e) =>
                    setRecurrenceInterval(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-1/2"
                />
                {getFrequencyUnit(recurrenceFrequency)}
              
            
            
            {recurrenceFrequency === 'Semanal' && (
              
                Repete-se
              
              
                  type="multiple"
                  variant="outline"
                  value={recurrenceDays}
                  onValueChange={setRecurrenceDays}
                  className="col-span-3 justify-start flex-wrap"
                
                  {weekDays.map((day) => (
                    
                      key={day.id}
                      value={day.id}
                      aria-label={`Repetir em ${day.label}`}
                      className="px-2 py-1 h-auto text-xs"
                    >
                      {day.label}
                    
                  ))}
                
              
            )}
            
          
        )}
      
      
        
          Cancelar
        
        
          Criar tarefa
        
      
    
  
      title="A fazer"
      tasks={todoTasks}
      taskCount={todoTasks.length}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    />
    
      title="Em progresso"
      tasks={inProgressTasks}
      taskCount={inProgressTasks.length}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    />
    
      title="Concluído"
      tasks={completedTasks}
      taskCount={completedTasks.length}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    />
  


export default Tasks;
    