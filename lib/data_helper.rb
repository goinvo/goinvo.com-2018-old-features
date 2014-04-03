module DataHelper
  def client_for_name(client_name)
    match = data.clients.detect { |c| c.name == client_name }
    puts "didn't find a match for name: #{client_name}" if match.nil?
    
    match
  end
  
  def practice_areas(project)
    project.practice_area_names.split(',').map(&:strip)
  end
end
